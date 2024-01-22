import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import permit from '../../middlewares/permission.middlewares';
import { RoleNames } from '../../schema/enums/role.enums';
import {
     createDownloadableResourceController,
     createExternalResourceController,
     deleteLectureResourceController,
     getLectureResourcesController,
} from '../../controllers/lecture/lecture-resources.controller';
import validate from '../../middlewares/validation.middleware';
import {
     createDownloadableResourceInput,
     createExternalResourceInput,
} from '../../schema/validators/lecture.validator';

const lectureResourcesRoute = Router();

lectureResourcesRoute.post(
     '/lecture/:id/downloadable',
     authenticate,
     permit([RoleNames.INSTRUCTOR]),
     validate(createDownloadableResourceInput),
     createDownloadableResourceController
);
lectureResourcesRoute.post(
     '/lecture/:id/external',
     authenticate,
     permit([RoleNames.INSTRUCTOR]),
     validate(createExternalResourceInput),
     createExternalResourceController
);
lectureResourcesRoute.get('/lecture/:id', getLectureResourcesController);
lectureResourcesRoute.delete('/:id', deleteLectureResourceController);

export default lectureResourcesRoute;
