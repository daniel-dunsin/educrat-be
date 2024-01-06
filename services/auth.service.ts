import { v4 } from 'uuid';
import { comparePassword, hashPassword } from '../helpers/auth.helper';
import { renderEmailTemplate } from '../helpers/email.helper';
import AuthModel from '../models/auth.model';
import TokenModel from '../models/token.model';
import UserModel from '../models/user.model';
import { CreateTokenDTO, SignInDTO, SignUpDTO, VerifyAccountDTO } from '../schema/dto/auth.dto';
import { TokenTypes } from '../schema/enums/auth.enums';
import ServiceException from '../schema/exception/service.exception';
import sendMail from './email.service';
import secrets from '../constants/secrets.const';
import { Token, User } from '../schema/interfaces/user.interface';
import JwtHelper from '../helpers/jwt.helper';
import redisCache from './cache.service';

// helpers
async function auth(user: User) {
     const accessToken = await JwtHelper.sign(user?._id);
     await redisCache.set(`user:${user._id}`, user);
     return { ...user, accessToken };
}

async function findOrCreateToken(data: CreateTokenDTO): Promise<Token> {
     let token = await TokenModel.findOne({ email: data.email, type: data.type });
     if (token) {
          token.code = data.code;
          token.value = data.value;
          token = await token.save();
     }
     {
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
     await UserModel.create({ email, username, firstName, lastName });

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

     const dbToken = await TokenModel.findOne({ code, token, type: TokenTypes.userVerification });
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
     const user = await UserModel.findOne({ email: dbAuth.email });

     const isMatch = await comparePassword(password, dbAuth.password);
     if (!isMatch) throw new ServiceException(400, 'Invalid Login Credentials');

     return { ...auth(user as User) };
}
