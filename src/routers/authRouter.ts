import RoutePath from '@constants/routePath';
import authController from '@controllers/authController';
import { Router } from 'express';

const authRouter = Router();

authRouter.post(RoutePath.SIGN_IN, authController.signIn);

authRouter.post(RoutePath.SIGN_UP, authController.signUp);

export default authRouter;
