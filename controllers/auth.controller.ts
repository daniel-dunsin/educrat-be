import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../helpers/async,helper';
import { SignUpDTO } from '../schema/dto/auth.dto';
import { signUp } from '../services/auth.service';

export const signUpController = asyncHandler(async function (
     req: Request<{}, {}, SignUpDTO>,
     res: Response,
     next: NextFunction
) {
     await signUp(req.body);

     res.status(201).json({ message: 'verification email sent' });
});
