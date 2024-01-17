import { Router } from 'express';
import validate from '../../middlewares/validation.middleware';
import { createModuleInput, updateModuleInput } from '../../schema/validators/module.validator';
import {
     createModuleController,
     deleteModuleController,
     getModulesController,
     updateModuleController,
} from '../../controllers/module/module.controller';

const moduleRoutes = Router();

moduleRoutes.post('/course/:id', validate(createModuleInput), createModuleController);
moduleRoutes.get('/course/:id', getModulesController);
moduleRoutes.put('/:id', validate(updateModuleInput), updateModuleController);
moduleRoutes.delete('/:id', deleteModuleController);

export default moduleRoutes;
