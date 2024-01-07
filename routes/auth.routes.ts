import { Router } from 'express';
import validate from '../middlewares/validation.middleware';
import {
     googleAuthInput,
     requestVerificationInput,
     signInInput,
     signUpInput,
     verifyAccountInput,
} from '../schema/validators/auth.validator';
import {
     googleSignInController,
     requestVerificationLinkController,
     signInController,
     signUpController,
     verifyAccountController,
} from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', validate(signUpInput), signUpController);
authRoutes.post('/verification', validate(verifyAccountInput), verifyAccountController);
authRoutes.post('/verification/request', validate(requestVerificationInput), requestVerificationLinkController);
authRoutes.post('/login', validate(signInInput), signInController);
authRoutes.post('/google', validate(googleAuthInput), googleSignInController);

export default authRoutes;
