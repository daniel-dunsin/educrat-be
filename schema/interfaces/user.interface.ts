import { TokenTypes } from '../enums/auth.enums';
import { DefaultModel } from './index.interface';
import { Role } from './roles.interface';
import { Socials } from './socials.interface';

export interface User extends DefaultModel {
     email: string;
     username: string;
     firstName: string;
     lastName: string;
     profilePicture: string;
     profilePictureId: string;
     biography: string;
     headline: string;
     roles: Role[];
     socials: Socials[];
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
