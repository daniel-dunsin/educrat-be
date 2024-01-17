import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import permit from '../../middlewares/permission.middlewares';
import { RoleNames } from '../../schema/enums/role.enums';
import moduleRoutes from './module.routes';

const router = Router();

router.use('/', authenticate, permit([RoleNames.INSTRUCTOR]), moduleRoutes);

export default router;
