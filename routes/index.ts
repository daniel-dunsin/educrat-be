import { Router } from 'express';
import authRoutes from './auth.routes';
import { authenticate } from '../middlewares/auth.middleware';
import userRoutes from './user.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', authenticate, userRoutes);

export default routes;
