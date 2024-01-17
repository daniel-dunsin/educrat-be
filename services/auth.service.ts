import { v4 } from 'uuid';
import { comparePassword, hashPassword } from '../helpers/auth.helper';
import { renderEmailTemplate } from '../helpers/email.helper';
import AuthModel from '../models/user/auth.model';
import TokenModel from '../models/user/token.model';
import UserModel from '../models/user/user.model';
import {
     CreateTokenDTO,
     ResetPasswordDTO,
     SignInDTO,
     SignUpDTO,
     VerifyAccountDTO,
     VerifyGoogleUserRes,
} from '../schema/dto/auth.dto';
import { TokenTypes } from '../schema/enums/auth.enums';
import ServiceException from '../schema/exception/service.exception';
import sendMail from './email.service';
import secrets from '../constants/secrets.const';
import { Token, User } from '../schema/interfaces/user.interface';
import JwtHelper from '../helpers/jwt.helper';
import redisCache from './cache.service';
import { google } from 'googleapis';
import { addStudentRole } from './role.service';
import crypto from 'crypto';

// helpers
async function auth(user: User) {
     const accessToken = await JwtHelper.sign(user?._id);
     await redisCache.set(`user:${user._id}`, user);
     return { user, accessToken };
}

export async function findOrCreateToken(data: CreateTokenDTO): Promise<Token> {
     let token = await TokenModel.findOne({ email: data.email, type: data.type });
     if (token) {
          token.code = data.code;
          token.value = data.value;
          token = await token.save();
     } else {
          token = await TokenModel.create({ ...data });
     }
     return token;
}

export async function signUp(data: SignUpDTO) {
     const { email, password, firstName, lastName, username } = data;

     const userExists = await AuthModel.findOne({ $or: [{ username }, { email }] });
     if (userExists) throw new ServiceException(400, 'User already exists');

     const hashedPassword = await hashPassword(password);
     await AuthModel.create({ email, username, password: hashedPassword });
     const user = await UserModel.create({ email, username, firstName, lastName });
     await addStudentRole(user);

     const token = v4();
     const code = String(Math.floor(Math.random() * 99999999));
     const link = `${secrets.frontendUrl}/verify-account/${code}/${token}`;
     await findOrCreateToken({ value: token, code, type: TokenTypes.userVerification, email });

     await sendMail({
          to: email,
          subject: 'Email Verification - Educraft',
          html: renderEmailTemplate('verify-account.ejs', { username, link }),
     });
}

export async function verifyAccount(data: VerifyAccountDTO) {
     const { code, token } = data;

     const dbToken = await TokenModel.findOne({ code, value: token, type: TokenTypes.userVerification });
     if (!dbToken) throw new ServiceException(404, 'Token does not exist or has expired');

     const auth = await AuthModel.findOne({ email: dbToken.email });
     if (!auth) throw new ServiceException(404, 'User does not exist');
     if (auth.verified) throw new ServiceException(400, 'User is already verified');

     auth.verified = true;
     await auth.save();
     await dbToken.deleteOne();
}

export async function requestVerificationLink(email: string) {
     const auth = await AuthModel.findOne({ email });
     if (!auth) throw new ServiceException(404, 'User does not exist');
     if (auth.verified) throw new ServiceException(400, 'User is already verified');

     const token = v4();
     const code = String(Math.floor(Math.random() * 99999999));

     await findOrCreateToken({ code, value: token, email, type: TokenTypes.userVerification });
     const link = `${secrets.frontendUrl}/verify-account/${code}/${token}`;
     await sendMail({
          to: email,
          subject: 'Email Verification - Educraft',
          html: renderEmailTemplate('verify-account.ejs', { username: auth.username, link }),
     });
}

export async function signIn(data: SignInDTO) {
     const { credential, password } = data;

     const dbAuth = await AuthModel.findOne({ $or: [{ username: credential }, { email: credential }] });
     if (!dbAuth) throw new ServiceException(404, 'Invalid Login Credentials');
     if (!dbAuth.verified) throw new ServiceException(400, 'User is not verified');
     const user = await UserModel.findOne({ email: dbAuth.email })
          .populate({ path: 'roles' })
          .populate({ path: 'socials' });

     const isMatch = await comparePassword(password, dbAuth.password);
     if (!isMatch) throw new ServiceException(400, 'Invalid Login Credentials');

     return await auth(user as User);
}

export async function verifyGoogleUser(accessToken: string): Promise<VerifyGoogleUserRes> {
     const oauthClient = new google.auth.OAuth2({
          clientId: secrets.google.clientId,
          clientSecret: secrets.google.clientSecret,
     });
     oauthClient.setCredentials({ access_token: accessToken });

     const authenticator = google.oauth2({ auth: oauthClient, version: 'v2' });

     try {
          const user = await authenticator.userinfo.get();

          return {
               email: <string>user.data.email,
               username: <string>user.data.name,
               firstName: <string>user.data.given_name,
               lastName: <string>user.data.family_name,
               profilePicture: <string>user.data.picture,
          };
     } catch (error) {
          throw new ServiceException(400, `Unable to verify google user ${error}`);
     }
}

export async function signInWithGoogle(accessToken: string) {
     const googleUser = await verifyGoogleUser(accessToken);
     if (!googleUser) throw new ServiceException(500, 'Unable to sign in with google');

     let dbAuth = await AuthModel.findOne({ email: googleUser.email });

     if (dbAuth) {
          const dbUser = await UserModel.findOne({ email: googleUser.email })
               .populate({ path: 'roles' })
               .populate({ path: 'socials' });
          if (!dbAuth.verified) dbAuth.verified = true;
          await dbAuth.save();
          return await auth(dbUser as User);
     } else {
          dbAuth = await AuthModel.create({ email: googleUser.email, username: googleUser.username, verified: true });
          const dbUser = await UserModel.create({
               email: googleUser.email,
               username: googleUser.username,
               profilePicture: googleUser.profilePicture,
               firstName: googleUser.firstName,
               lastName: googleUser.lastName,
          });
          const role = await addStudentRole(dbUser);
          return await auth({ ...dbUser, roles: [role], socials: [] });
     }
}

export async function forgotPassword(email: string) {
     const user = await AuthModel.findOne({ email });
     if (user) {
          const token = crypto.randomBytes(32).toString('hex');
          const code = String(Math.floor(Math.random() * 99999999));
          const link = `${secrets.frontendUrl}/reset-password/${code}/${token}`;
          await findOrCreateToken({ value: token, email, code, type: TokenTypes.passwordReset });
          await sendMail({
               to: email,
               subject: 'Password Reset',
               html: renderEmailTemplate('forgot-password.ejs', { username: user.username, link }),
          });
     }
}

export async function resetPassword(data: ResetPasswordDTO) {
     const { token, code, password } = data;
     const dbToken = await TokenModel.findOne({ value: token, code, type: TokenTypes.passwordReset });
     if (!dbToken) {
          throw new ServiceException(404, 'Token/Code is invalid');
     }

     const hashedPassword = await hashPassword(password);

     await AuthModel.findOneAndUpdate({ email: dbToken.email }, { password: hashedPassword });
     await dbToken.deleteOne();
}
