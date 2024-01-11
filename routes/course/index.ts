import { Router } from 'express';
import courseCategoryRoutes from './course-category.routes';

const router = Router();

router.use('/category', courseCategoryRoutes);

export default router;
