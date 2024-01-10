import mongoose from 'mongoose';
import { deleteResource, uploadResource } from '../config/upload.config';
import DEFAULT_IMAGES from '../constants/images.const';
import { isBase64 } from '../helpers/image.helper';
import RoleModel from '../models/role.model';
import SocialsModel from '../models/socials.model';
import UserModel from '../models/user.model';
import { BecomeInstructorDTO, UpdateProfilePictureDTO, UpdateSocialsDTO, UpdateUserDTO } from '../schema/dto/user.dto';
import { RoleNames } from '../schema/enums/role.enums';
import ServiceException from '../schema/exception/service.exception';
import { User } from '../schema/interfaces/user.interface';
import redisCache from './cache.service';
import { addInstructorRole } from './role.service';
import _ from 'lodash';

export async function getUser(userId: string) {
     let user = await redisCache.get<User>(`user:${userId}`);
     if (!user) {
          user = await UserModel.findById(userId).populate({ path: 'roles' }).populate({ path: 'socials' });
          if (!user) throw new ServiceException(404, 'User does not exist');
          await redisCache.set(`user:${userId}`, user);
     }

     return user;
}

export async function becomeInstructor(data: BecomeInstructorDTO) {
     const { userId, biography, headline, socials } = data;

     const user = await UserModel.findById(userId);
     if (!user) throw new ServiceException(404, 'User does not exist');

     const dbRole = await RoleModel.findOne({ userId: userId, name: RoleNames.INSTRUCTOR });
     if (dbRole) throw new ServiceException(400, 'You are already an instructor');

     return await mongoose.connection.startSession().then(async (session) => {
          await session.startTransaction();
          try {
               await updateUser({ userId, biography, headline }, session);
               await updateUserSocials(userId, socials, session);
               await addInstructorRole(user);
               await session.commitTransaction();
          } catch (error) {
               await session.abortTransaction();
               return error;
          }
     });
}

export async function updateUser(data: UpdateUserDTO, session?: mongoose.mongo.ClientSession) {
     const user = await UserModel.findByIdAndUpdate(
          data.userId,
          { ..._.omit(data, 'userId') },
          { new: true, runValidators: true, session }
     )
          .populate({ path: 'roles' })
          .populate({ path: 'socials' });

     if (!user) throw new ServiceException(404, 'User does not exist');

     await redisCache.set(`user:${data.userId}`, user);
     return user;
}

export async function updateProfilePicture(data: UpdateProfilePictureDTO, session?: mongoose.mongo.ClientSession) {
     const user = await UserModel.findById(data.userId);
     if (!user) throw new ServiceException(404, 'User does not exist');

     let profilePicture = user.profilePicture;
     let profilePictureId = user.profilePictureId ?? '';

     if (isBase64(data.image)) {
          // upload a new one
          const resource = await uploadResource(data.image);

          if (profilePicture != DEFAULT_IMAGES.profilePicture && profilePictureId) {
               // delete the current resource
               await deleteResource(user.profilePictureId);
          }

          profilePicture = resource.url;
          profilePictureId = resource.public_id;
     }

     user.profilePicture = profilePicture;
     user.profilePictureId = profilePictureId;
     await user.save({ session });
     await redisCache.delete(`user:${data.userId}`);
}

export async function updateUserSocials(
     userId: string,
     socials: UpdateSocialsDTO[],
     session?: mongoose.mongo.ClientSession
) {
     for (const social of socials) {
          if (social.type) {
               await SocialsModel.findOneAndUpdate(
                    { userId, type: social.type },
                    { url: social.url },
                    { upsert: true, new: true, runValidators: true, session }
               );
          }
     }
     await redisCache.delete(`user:${userId}`);
}
