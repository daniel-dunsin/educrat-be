import { Router } from 'express';
import validate from '../../middlewares/validation.middleware';
import {
     forgotPasswordInput,
     googleAuthInput,
     requestVerificationInput,
     resetPasswordInput,
     signInInput,
     signUpInput,
     verifyAccountInput,
} from '../../schema/validators/auth.validator';
import {
     forgotPasswordController,
     googleSignInController,
     requestVerificationLinkController,
     resetPasswordController,
     signInController,
     signUpController,
     verifyAccountController,
} from '../../controllers/auth/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', validate(signUpInput), signUpController);
authRoutes.post('/verification', validate(verifyAccountInput), verifyAccountController);
authRoutes.post('/verification/request', validate(requestVerificationInput), requestVerificationLinkController);
authRoutes.post('/login', validate(signInInput), signInController);
authRoutes.post('/google', validate(googleAuthInput), googleSignInController);
authRoutes.post('/password/forgot', validate(forgotPasswordInput), forgotPasswordController);
authRoutes.patch('/password/reset', validate(resetPasswordInput), resetPasswordController);

export default authRoutes;
