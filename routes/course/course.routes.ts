import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import permit from '../../middlewares/permission.middlewares';
import { RoleNames } from '../../schema/enums/role.enums';
import validate from '../../middlewares/validation.middleware';
import {
     createCourseInput,
     updateCourseInput,
     updateCourseThumbnailInput,
} from '../../schema/validators/course.validator';
import {
     createCourseController,
     updateCourseController,
     updateCourseStatusController,
     updateCourseThumbnailController,
} from '../../controllers/course/course.controller';

const courseRoutes = Router();

courseRoutes.post(
     '/',
     authenticate,
     permit([RoleNames.INSTRUCTOR]),
     validate(createCourseInput),
     createCourseController
);

courseRoutes.put(
     '/:id',
     authenticate,
     permit([RoleNames.INSTRUCTOR]),
     validate(updateCourseInput),
     updateCourseController
);

courseRoutes.put(
     '/:id/thumbnail',
     authenticate,
     permit([RoleNames.INSTRUCTOR]),
     validate(updateCourseThumbnailInput),
     updateCourseThumbnailController
);

courseRoutes.put(
     '/:id/status',
     authenticate,
     permit([RoleNames.INSTRUCTOR, RoleNames.ADMIN]),
     validate(updateCourseInput),
     updateCourseStatusController
);

export default courseRoutes;
