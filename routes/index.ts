import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import courseRoutes from './course';
import moduleRoutes from './module';
import lectureRoutes from './lecture';
import enrollmentRoutes from './enrollment';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/course', courseRoutes);
routes.use('/module', moduleRoutes);
routes.use('/lecture', lectureRoutes);
routes.use('/enrollment', enrollmentRoutes);

export default routes;
