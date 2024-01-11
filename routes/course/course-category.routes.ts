import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import permit from '../../middlewares/permission.middlewares';
import { RoleNames } from '../../schema/enums/role.enums';
import validate from '../../middlewares/validation.middleware';
import { createCategoryInput, updateCategoryInput } from '../../schema/validators/course-category.validator';
import {
     createCategoryController,
     deleteCategoryController,
     getAllCatgoriesController,
     getSingleCategoryController,
     updateCategoryController,
} from '../../controllers/course/course-category.controller';

const courseCategoryRoutes = Router();

courseCategoryRoutes.get('/', getAllCatgoriesController);
courseCategoryRoutes.get('/:id', getSingleCategoryController);
courseCategoryRoutes.post(
     '/',
     authenticate,
     permit(RoleNames.ADMIN),
     validate(createCategoryInput),
     createCategoryController
);
courseCategoryRoutes.put(
     '/:id',
     authenticate,
     permit(RoleNames.ADMIN),
     validate(updateCategoryInput),
     updateCategoryController
);
courseCategoryRoutes.delete('/:id', authenticate, permit(RoleNames.ADMIN), deleteCategoryController);

export default courseCategoryRoutes;
