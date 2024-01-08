import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../helpers/async,helper';
import { ResetPasswordDTO, SignInDTO, SignUpDTO, VerifyAccountDTO } from '../schema/dto/auth.dto';
import {
     forgotPassword,
     requestVerificationLink,
     resetPassword,
     signIn,
     signInWithGoogle,
     signUp,
     verifyAccount,
} from '../services/auth.service';

export const signUpController = asyncHandler(async function (req: Request<{}, {}, SignUpDTO>, res: Response) {
     await signUp(req.body);

     res.status(201).json({ message: 'verification email sent' });
});

export const verifyAccountController = asyncHandler(async function (
     req: Request<{}, {}, VerifyAccountDTO>,
     res: Response
) {
     await verifyAccount(req.body);

     res.status(200).json({ message: 'account verified successfully' });
});

export const requestVerificationLinkController = asyncHandler(async function (
     req: Request<{}, {}, { email: string }>,
     res: Response
) {
     await requestVerificationLink(req.body.email);

     res.status(200).json({ message: 'verification link sent' });
});

export const signInController = asyncHandler(async function (req: Request<{}, {}, SignInDTO>, res: Response) {
     const data = await signIn(req.body);

     res.status(200).json(data);
});

export const googleSignInController = asyncHandler(async function (req: Request<{}, {}, { accessToken: string }>, res) {
     const data = await signInWithGoogle(req.body.accessToken);

     res.status(200).json(data);
});

export const forgotPasswordController = asyncHandler(async function (req: Request<{}, {}, { email: string }>, res) {
     await forgotPassword(req.body.email);

     res.status(200).json({ message: 'password reset link sent' });
});

export const resetPasswordController = asyncHandler(async function (req: Request<{}, {}, ResetPasswordDTO>, res) {
     await resetPassword(req.body);

     res.status(200).json({ message: 'password reset successful' });
});
