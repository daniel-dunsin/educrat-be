import { NextFunction, Request, Response } from 'express';
import ServiceException from '../schema/exception/service.exception';

export default function errorHandler(error: Error | ServiceException, req: Request, res: Response, next: NextFunction) {
     if (error instanceof ServiceException) {
          res.status(error?.statusCode).json({ error: error?.message || error });
     } else {
          res.status(500).json({ error: error.message || error || 'an internal server error occured' });
     }
}
