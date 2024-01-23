import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import permit from '../../middlewares/permission.middlewares';
import { RoleNames } from '../../schema/enums/role.enums';
import validate from '../../middlewares/validation.middleware';
import {
     createLectureArticleController,
     createLectureVideoController,
     deleteLectureArticleController,
     deleteLectureVideoController,
     getLectureContentController,
} from '../../controllers/lecture/lecture-content.controller';
import { createLectureArticleInput, createLectureVideoInput } from '../../schema/validators/lecture.validator';

const lectureContentRoutes = Router();

lectureContentRoutes.post(
     '/lecture/:id/video',
     authenticate,
     permit([RoleNames.INSTRUCTOR]),
     validate(createLectureVideoInput),
     createLectureVideoController
);
lectureContentRoutes.post(
     '/lecture/:id/article',
     authenticate,
     permit([RoleNames.INSTRUCTOR]),
     validate(createLectureArticleInput),
     createLectureArticleController
);
lectureContentRoutes.delete(
     '/article/:id',
     authenticate,
     permit([RoleNames.INSTRUCTOR]),
     deleteLectureArticleController
);
lectureContentRoutes.delete('/video/:id', authenticate, permit([RoleNames.INSTRUCTOR]), deleteLectureVideoController);
lectureContentRoutes.get('/lecture/:id', getLectureContentController);

export default lectureContentRoutes;
