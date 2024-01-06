import { TokenTypes } from '../enums/auth.enums';
import { DefaultModel } from './index.interface';

export interface User extends DefaultModel {
     email: string;
     username: string;
     firstName: string;
     lastName: string;
     profilePicture: string;
}

export interface Auth extends DefaultModel {
     email: string;
     username: string;
     password: string;
     verified: boolean;
}

export interface Token extends DefaultModel {
     type: TokenTypes;
     value: string;
     email: string;
     code?: string;
}
