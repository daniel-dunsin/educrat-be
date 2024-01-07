import { NextFunction, Request, Response } from 'express';
import ServiceException from '../schema/exception/service.exception';
import JwtHelper from '../helpers/jwt.helper';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
     try {
          const authHeader = req.headers['authorization'];

          if (!authHeader || !authHeader.startsWith('Bearer '))
               throw new ServiceException(401, 'Provide header in this format=> Bearer ${token}');

          const token = authHeader.split(' ')[1] || '';
          const payload = await JwtHelper.verify(token);
          if (!payload.userId) throw new ServiceException(403, 'Unable to verify token');

          req.userId = payload.userId;
          next();
     } catch (error) {
          return next(error);
     }
}
