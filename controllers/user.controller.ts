import { Request } from 'express';
import asyncHandler from '../helpers/async.helper';
import { becomeInstructor, getUser, updateUser } from '../services/user.service';
import { BecomeInstructorDTO, UpdateUserDTO } from '../schema/dto/user.dto';

export const getUserController = asyncHandler(async (req, res) => {
     const userId = req.userId as string;

     const data = await getUser(userId);

     res.status(200).json(data);
});

export const becomeInstructorController = asyncHandler(async (req: Request<{}, {}, BecomeInstructorDTO>, res) => {
     const userId = req.userId as string;

     await becomeInstructor({ userId, about: req.body.about });

     res.status(200).json({ message: 'you are now an instructor' });
});

export const updateUserController = asyncHandler(async (req: Request<{}, {}, UpdateUserDTO>, res) => {
     const userId = req.userId as string;

     const data = await updateUser({ ...req.body, userId });

     res.status(200).json(data);
});
