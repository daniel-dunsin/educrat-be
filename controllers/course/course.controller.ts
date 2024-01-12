import { Request } from 'express';
import asyncHandler from '../../helpers/async.helper';
import { CreateCourseDTO, UpdateCourseDTO, UpdateCourseThumbnailDTO } from '../../schema/dto/course.dto';
import { createCourse, deleteCourse, updateCourse } from '../../services/course.service';

export const createCourseController = asyncHandler(async (req: Request<{}, {}, CreateCourseDTO>, res) => {
     const userId = req.userId as string;
     const data = await createCourse({ ...req.body, userId });

     res.status(201).json(data);
});

export const updateCourseController = asyncHandler(async (req: Request<{ id: string }, {}, UpdateCourseDTO>, res) => {
     const id = req.params.id;

     const data = await updateCourse({ ...req.body, id });

     res.status(200).json(data);
});

export const deleteCourseController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const courseId = req.params.id;

     await deleteCourse(courseId);

     res.status(200).json({ message: 'course deleted successfully' });
});

export const updateCourseThumbnailController = asyncHandler(
     async (req: Request<{ id: string }, {}, UpdateCourseThumbnailDTO>, res) => {
          const courseId = req.params.id;

          const data = await updateCourse({ ...req.body, id: courseId });

          res.status(200).json(data);
     }
);
