import { Router } from 'express';
import enrollmentRoutes from './enrollment.routes';

const router = Router();

router.use('/', enrollmentRoutes);

export default router;
