import { RoleNames } from '../enums/role.enums';
import { Relations } from '../types/base.type';
import { DefaultModel } from './index.interface';
import { User } from './user.interface';

export interface Role extends DefaultModel {
     name: RoleNames;
     description: string;
     userId: Relations<User>;
}
