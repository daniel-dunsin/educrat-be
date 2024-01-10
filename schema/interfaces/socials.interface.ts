import { SocialsTypes } from '../enums/socials.enum';
import { Relations } from '../types/base.type';
import { DefaultModel } from './index.interface';
import { User } from './user.interface';

export interface Socials extends DefaultModel {
     userId: Relations<User>;
     type: SocialsTypes;
     url: string;
}
