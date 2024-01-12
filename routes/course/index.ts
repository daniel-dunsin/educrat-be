import { Router } from 'express';
import courseCategoryRoutes from './course-category.routes';
import courseRoutes from './course.routes';

const router = Router();

router.use('/category', courseCategoryRoutes);
router.use('/', courseRoutes);

export default router;
