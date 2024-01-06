import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../helpers/async,helper';
import { SignInDTO, SignUpDTO, VerifyAccountDTO } from '../schema/dto/auth.dto';
import { requestVerificationLink, signIn, signUp, verifyAccount } from '../services/auth.service';

export const signUpController = asyncHandler(async function (
     req: Request<{}, {}, SignUpDTO>,
     res: Response,
     next: NextFunction
) {
     await signUp(req.body);

     res.status(201).json({ message: 'verification email sent' });
});

export const verifyAccountController = asyncHandler(async function (
     req: Request<{}, {}, VerifyAccountDTO>,
     res: Response,
     next: NextFunction
) {
     await verifyAccount(req.body);

     res.status(200).json({ message: 'account verified successfully' });
});

export const requestVerificationLinkController = asyncHandler(async function (
     req: Request<{}, {}, { email: string }>,
     res: Response,
     next: NextFunction
) {
     await requestVerificationLink(req.body.email);

     res.status(200).json({ message: 'verification link sent' });
});

export const signInController = asyncHandler(async function (
     req: Request<{}, {}, SignInDTO>,
     res: Response,
     next: NextFunction
) {
     const data = await signIn(req.body);

     res.status(200).json(data);
});
