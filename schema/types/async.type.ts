import { NextFunction, Request, Response } from 'express';

export type AsyncFunction<Params = any, ResBody = any, ReqBody = any, ReqQuery = any> = (
     req: Request<Params, ResBody, ReqBody, ReqQuery>,
     res: Response,
     next: NextFunction
) => void;
