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
