import { Router } from 'express';
import validate from '../middlewares/validation.middleware';
import {
     requestVerificationInput,
     signInInput,
     signUpInput,
     verifyAccountInput,
} from '../schema/validators/auth.validator';
import {
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

export default authRoutes;
