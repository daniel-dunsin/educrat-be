import { NextFunction, Request, Response } from 'express';
import { AsyncFunction } from '../schema/types/async.type';

export default function asyncHandler(cb: AsyncFunction) {
     return async function (req: Request, res: Response, next: NextFunction) {
          try {
               await cb(req, res, next);
          } catch (error) {
               next(error);
          }
     };
}
