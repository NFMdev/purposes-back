import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/signin', AuthController.signin);
authRoutes.post('/login', AuthController.login);
authRoutes.post('/recover-password', AuthController.recoverPassword);

export default authRoutes;