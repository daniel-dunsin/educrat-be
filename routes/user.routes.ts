import { Router } from 'express';
import { becomeInstructorController, getUserController, updateUserController } from '../controllers/user.controller';
import validate from '../middlewares/validation.middleware';
import { becomeInstructorInput, updateUserInput } from '../schema/validators/user.validator';

const userRoutes = Router();

userRoutes.get('/', getUserController);
userRoutes.put('/', validate(updateUserInput), updateUserController);
userRoutes.put('/instructor', validate(becomeInstructorInput), becomeInstructorController);

export default userRoutes;
