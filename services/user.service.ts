import RoleModel from '../models/role.model';
import UserModel from '../models/user.model';
import { BecomeInstructorDTO, UpdateUserDTO } from '../schema/dto/user.dto';
import { RoleNames } from '../schema/enums/role.enums';
import ServiceException from '../schema/exception/service.exception';
import { User } from '../schema/interfaces/user.interface';
import redisCache from './cache.service';
import { addInstructorRole } from './role.service';
import _ from 'lodash';

export async function getUser(userId: string) {
     let user = await redisCache.get<User>(`user:${userId}`);
     if (!user) {
          user = await UserModel.findById(userId).populate({ path: 'roles' });
          if (!user) throw new ServiceException(404, 'User does not exist');
          await redisCache.set(`user:${userId}`, user);
     }

     return user;
}

export async function becomeInstructor(data: BecomeInstructorDTO) {
     const user = await UserModel.findById(data.userId);
     if (!user) throw new ServiceException(404, 'User does not exist');

     const dbRole = await RoleModel.findOne({ userId: data.userId, name: RoleNames.INSTRUCTOR });
     if (dbRole) throw new ServiceException(400, 'You are already an instructor');

     user.about = data.about ?? '';
     await user.save();
     await addInstructorRole(user);
}

export async function updateUser(data: UpdateUserDTO) {
     const user = await UserModel.findByIdAndUpdate(
          data.userId,
          { ..._.omit(data, 'userId') },
          { new: true, runValidators: true }
     );

     if (!user) throw new ServiceException(404, 'User does not exist');

     return user;
}
