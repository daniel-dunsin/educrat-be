import RoleModel from '../models/user/role.model';
import { RoleNames } from '../schema/enums/role.enums';
import { Role } from '../schema/interfaces/roles.interface';
import { User } from '../schema/interfaces/user.interface';
import redisCache from './cache.service';

export async function addStudentRole(user: User): Promise<Role> {
     const role = await RoleModel.create({
          name: RoleNames.STUDENT,
          userId: user._id,
          description: 'Student Role',
     });

     await redisCache.set(`role:${role.name}:${user._id}`, role);

     return role;
}

export async function addInstructorRole(user: User): Promise<Role> {
     const role = await RoleModel.create({
          name: RoleNames.INSTRUCTOR,
          userId: user._id,
          description: 'Insturctor Role',
     });

     await redisCache.set(`role:${role.name}:${user._id}`, role);

     return role;
}

export async function addAdminRole(user: User): Promise<Role> {
     const role = await RoleModel.create({
          name: RoleNames.ADMIN,
          userId: user._id,
          description: 'Admin Role',
     });

     await redisCache.set(`role:${role.name}:${user._id}`, role);

     return role;
}
