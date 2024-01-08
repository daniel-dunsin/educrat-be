import { TokenTypes } from '../enums/auth.enums';

export interface SignUpDTO {
     password: string;
     username: string;
     lastName: string;
     firstName: string;
     email: string;
}

export interface SignInDTO {
     credential: string;
     password: string;
}

export interface CreateTokenDTO {
     value: string;
     type: TokenTypes;
     email: string;
     code?: string;
}

export interface VerifyAccountDTO {
     code: string;
     token: string;
}

export interface VerifyGoogleUserRes {
     email: string;
     username: string;
     profilePicture: string;
     firstName: string;
     lastName: string;
}

export interface ResetPasswordDTO {
     token: string;
     code: string;
     password: string;
}
