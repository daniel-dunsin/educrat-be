import { Request } from 'express';
import asyncHandler from '../helpers/async.helper';
import {
     becomeInstructor,
     getUser,
     updateProfilePicture,
     updateUser,
     updateUserSocials,
} from '../services/user.service';
import { BecomeInstructorDTO, UpdateSocialsDTO, UpdateUserDTO } from '../schema/dto/user.dto';

export const getUserController = asyncHandler(async (req, res) => {
     const userId = req.userId as string;

     const data = await getUser(userId);

     res.status(200).json(data);
});

export const becomeInstructorController = asyncHandler(async (req: Request<{}, {}, BecomeInstructorDTO>, res) => {
     const userId = req.userId as string;

     await becomeInstructor({ ...req.body, userId });

     res.status(200).json({ message: 'you are now an instructor' });
});

export const updateUserController = asyncHandler(async (req: Request<{}, {}, UpdateUserDTO>, res) => {
     const userId = req.userId as string;

     const data = await updateUser({ ...req.body, userId });

     res.status(200).json(data);
});

export const updateProfilePictureController = asyncHandler(
     async (req: Request<{}, {}, { profilePicture: string }>, res) => {
          const userId = req.userId as string;

          await updateProfilePicture({ image: req.body.profilePicture, userId });

          res.status(200).json({ message: 'profile picture updated successfully' });
     }
);

export const updateSocialsController = asyncHandler(
     async (req: Request<{}, {}, { socials: UpdateSocialsDTO[] }>, res) => {
          const userId = req.userId as string;

          await updateUserSocials(userId, req.body.socials);

          res.status(200).json({ message: 'socials updated' });
     }
);

export const getUserProfileController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const userId = req.params.id;

     const data = await getUser(userId);

     res.status(200).json(data);
});
