import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import courseRoutes from './course';
import moduleRoutes from './module';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/course', courseRoutes);
routes.use('/module', moduleRoutes);

export default routes;
