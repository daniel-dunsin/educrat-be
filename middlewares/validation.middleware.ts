import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';
import ServiceException from '../schema/exception/service.exception';

export default function validate(schema: AnySchema) {
     return async function (req: Request, res: Response, next: NextFunction) {
          try {
               await schema.validate({
                    body: req.body,
                    query: req.query,
                    params: req.params,
               });

               next();
          } catch (error) {
               return next(new ServiceException(400, error));
          }
     };
}
