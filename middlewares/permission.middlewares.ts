import { NextFunction, Request, Response } from 'express';
import { RoleNames } from '../schema/enums/role.enums';
import ServiceException from '../schema/exception/service.exception';
import RoleModel from '../models/user/role.model';
import redisCache from '../services/cache.service';
import { Role } from '../schema/interfaces/roles.interface';

export default function permit(roles: RoleNames[]) {
     return async function (req: Request, res: Response, next: NextFunction) {
          try {
               let roleExists = false;

               // check if any of the roles tied to the user exist in the redis cache
               for (const role of roles) {
                    if (!roleExists) {
                         const roleCache = await redisCache.get<Role>(`role:${role}:${req.userId}`);
                         if (roleCache) roleExists = true;
                    }
               }

               if (roleExists) {
                    return next();
               }

               // check if it exists in the db
               const query = roles.map((role) => ({ name: role }));
               const dbRole = await RoleModel.findOne({ $or: query, userId: req.userId });
               if (dbRole) {
                    await redisCache.set(`role:${dbRole.name}:${req.userId}`, dbRole);
                    return next();
               } else {
                    return next(new ServiceException(401, 'You are not authorized to access this route'));
               }
          } catch (error) {
               return next(error);
          }
     };
}
