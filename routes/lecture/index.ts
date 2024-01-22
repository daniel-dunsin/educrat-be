import { Router } from 'express';
import lectureRoutes from './lecture.routes';
import lectureResourcesRoute from './lecture-resources.routes';

const router = Router();

router.use('/', lectureRoutes);
router.use('/resource', lectureResourcesRoute);

export default router;
