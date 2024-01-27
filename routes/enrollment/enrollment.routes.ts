import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import permit from '../../middlewares/permission.middlewares';
import { RoleNames } from '../../schema/enums/role.enums';
import {
     getSingleEnrollmentController,
     createEnrollmentController,
     getUserEnrollmentsController,
     markLectureAsCompletedController,
     markLectureAsUncompletedController,
} from '../../controllers/enrollment/enrollment.controller';
import validate from '../../middlewares/validation.middleware';
import {
     markLectureAsCompletedInput,
     markLectureAsUncompletedInput,
} from '../../schema/validators/enrollment.validator';

const enrollmentRoutes = Router();

enrollmentRoutes.post('/course/:id', authenticate, permit([RoleNames.STUDENT]), createEnrollmentController);

enrollmentRoutes.get('/', authenticate, permit([RoleNames.STUDENT]), getUserEnrollmentsController);

enrollmentRoutes.get('/:id', authenticate, permit([RoleNames.STUDENT]), getSingleEnrollmentController);

enrollmentRoutes.post(
     '/:id/lecture/complete',
     authenticate,
     permit([RoleNames.STUDENT]),
     validate(markLectureAsCompletedInput),
     markLectureAsCompletedController
);

enrollmentRoutes.post(
     '/:id/lecture/unfinished',
     authenticate,
     permit([RoleNames.STUDENT]),
     validate(markLectureAsUncompletedInput),
     markLectureAsUncompletedController
);

export default enrollmentRoutes;
