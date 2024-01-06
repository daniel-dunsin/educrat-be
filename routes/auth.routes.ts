import { Router } from 'express';
import validate from '../middlewares/validation.middleware';
import { signUpInput } from '../schema/validators/auth.validator';
import { signUpController } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', validate(signUpInput), signUpController);

export default authRoutes;
