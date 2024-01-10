import { Router } from 'express';
import {
     becomeInstructorController,
     getUserController,
     getUserProfileController,
     updateProfilePictureController,
     updateSocialsController,
     updateUserController,
} from '../controllers/user.controller';
import validate from '../middlewares/validation.middleware';
import {
     becomeInstructorInput,
     updateProfilePictureInput,
     updateSocialsInput,
     updateUserInput,
} from '../schema/validators/user.validator';
import { authenticate } from '../middlewares/auth.middleware';

const userRoutes = Router();

userRoutes.get('/', authenticate, getUserController);
userRoutes.get('/:id', getUserProfileController);
userRoutes.put('/', authenticate, validate(updateUserInput), updateUserController);
userRoutes.put('/instructor', authenticate, validate(becomeInstructorInput), becomeInstructorController);
userRoutes.put('/profile-picture', authenticate, validate(updateProfilePictureInput), updateProfilePictureController);
userRoutes.put('/socials', authenticate, validate(updateSocialsInput), updateSocialsController);

export default userRoutes;
