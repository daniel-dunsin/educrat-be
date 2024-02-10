import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import permit from '../../middlewares/permission.middlewares';
import { RoleNames } from '../../schema/enums/role.enums';
import validate from '../../middlewares/validation.middleware';
import {
     createLectureController,
     deleteLectureController,
     getLecturesController,
     getSingleLectureController,
     updateLectureController,
} from '../../controllers/lecture/lecture.controller';
import { createLectureInput, updateLectureInput } from '../../schema/validators/lecture.validator';

const lectureRoutes = Router();

lectureRoutes.get('/module/:id', getLecturesController);

lectureRoutes.post(
     '/module/:id',
     authenticate,
     permit([RoleNames.INSTRUCTOR]),
     validate(createLectureInput),
     createLectureController
);

lectureRoutes.get('/:id', authenticate, permit([RoleNames.INSTRUCTOR]), getSingleLectureController);

lectureRoutes.put(
     '/:id',
     authenticate,
     permit([RoleNames.INSTRUCTOR]),
     validate(updateLectureInput),
     updateLectureController
);
lectureRoutes.delete('/:id', authenticate, permit([RoleNames.INSTRUCTOR]), deleteLectureController);

export default lectureRoutes;
