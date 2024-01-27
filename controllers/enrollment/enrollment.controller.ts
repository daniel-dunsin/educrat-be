import { Request } from 'express';
import asyncHandler from '../../helpers/async.helper';
import {
     createEnrollment,
     getSingleEnrollment,
     getUserEnrollments,
     markLectureAsCompleted,
     markLectureAsUncompleted,
} from '../../services/enrollment.service';
import { CompletedLectureDTO } from '../../schema/dto/enrollment.dto';

export const createEnrollmentController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const userId = req.userId as string;
     const courseId = req.params.id;

     const data = await createEnrollment({ courseId, userId });

     res.status(201).json(data);
});

export const getUserEnrollmentsController = asyncHandler(async (req, res) => {
     const userId = req.userId as string;

     const data = await getUserEnrollments(userId);

     res.status(200).json(data);
});

export const getSingleEnrollmentController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const enrollmentId = req.params.id;

     const data = await getSingleEnrollment(enrollmentId);

     res.status(200).json(data);
});

export const markLectureAsCompletedController = asyncHandler(
     async (req: Request<{ id: string }, {}, CompletedLectureDTO>, res) => {
          const enrollmentId = req.params.id;

          await markLectureAsCompleted({ ...req.body, enrollmentId });

          res.status(200).json({ message: 'lecture has been marked as completed' });
     }
);

export const markLectureAsUncompletedController = asyncHandler(
     async (req: Request<{ id: string }, {}, CompletedLectureDTO>, res) => {
          const enrollmentId = req.params.id;

          await markLectureAsUncompleted({ ...req.body, enrollmentId });

          res.status(200).json({ message: 'lecture has been marked as uncompleted' });
     }
);
