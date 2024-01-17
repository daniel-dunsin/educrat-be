import { Router } from 'express';
import lectureRoutes from './lecture.routes';

const router = Router();

router.use('/', lectureRoutes);

export default router;
