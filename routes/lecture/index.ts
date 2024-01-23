import { Router } from 'express';
import lectureRoutes from './lecture.routes';
import lectureResourcesRoute from './lecture-resources.routes';
import lectureContentRoutes from './lecture-content.routes';

const router = Router();

router.use('/', lectureRoutes);
router.use('/resource', lectureResourcesRoute);
router.use('/content', lectureContentRoutes);

export default router;
