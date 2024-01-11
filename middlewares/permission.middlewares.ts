import { NextFunction, Request, Response } from 'express';
import { RoleNames } from '../schema/enums/role.enums';
import ServiceException from '../schema/exception/service.exception';
import RoleModel from '../models/role.model';
import redisCache from '../services/cache.service';
import { Role } from '../schema/interfaces/roles.interface';

export default function permit(role: RoleNames) {
     return async function (req: Request, res: Response, next: NextFunction) {
          try {
               const roleCache = await redisCache.get<Role>(`role:${role}:${req.userId}`);
               if (roleCache) {
                    return next();
               }
               const dbRole = await RoleModel.findOne({ name: role, userId: req.userId });
               if (dbRole) {
                    await redisCache.set(`role:${role}:${req.userId}`, dbRole);
                    return next();
               } else {
                    return next(new ServiceException(401, 'You are not authorized to access this route'));
               }
          } catch (error) {
               return next(error);
          }
     };
}
