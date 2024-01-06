import { v4 } from 'uuid';
import { hashPassword } from '../helpers/auth.helper';
import { renderEmailTemplate } from '../helpers/email.helper';
import AuthModel from '../models/auth.model';
import TokenModel from '../models/token.model';
import UserModel from '../models/user.model';
import { CreateTokenDTO, SignUpDTO } from '../schema/dto/auth.dto';
import { TokenTypes } from '../schema/enums/auth.enums';
import ServiceException from '../schema/exception/service.exception';
import sendMail from './email.service';
import secrets from '../constants/secrets.const';
import { Token } from '../schema/interfaces/user.interface';

// helpers
async function findOrCreateToken(data: CreateTokenDTO): Promise<Token> {
     let token = await TokenModel.findOne({ email: data.email, type: data.type });
     if (!token) token = await TokenModel.create({ ...data });

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
