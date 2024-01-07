import RoleModel from '../models/role.model';
import { RoleNames } from '../schema/enums/role.enums';
import { Role } from '../schema/interfaces/roles.interface';
import { User } from '../schema/interfaces/user.interface';

export async function addStudentRole(user: User): Promise<Role> {
     return await RoleModel.create({
          name: RoleNames.STUDENT,
          userId: user._id,
          description: 'Student Role',
     });
}

export async function addInstructorRole(user: User): Promise<Role> {
     return await RoleModel.create({
          name: RoleNames.INSTRUCTOR,
          userId: user._id,
          description: 'Insturctor Role',
     });
}

export async function addAdminRole(user: User): Promise<Role> {
     return await RoleModel.create({
          name: RoleNames.ADMIN,
          userId: user._id,
          description: 'Admin Role',
     });
}
