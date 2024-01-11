import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import courseRoutes from './course';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/course', courseRoutes);

export default routes;
