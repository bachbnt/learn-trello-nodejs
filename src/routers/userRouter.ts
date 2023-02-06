import RoutePath from '@constants/routePath';
import userController from '@controllers/userController';
import { userFormSchema } from '@core/validation';
import { authVerifier, formValidator } from '@middleware/auth';
import { Router } from 'express';

const userRouter = Router();

userRouter.get(RoutePath.HOME, authVerifier(), userController.getUsers);

userRouter.post(
  RoutePath.HOME,
  authVerifier(),
  formValidator(userFormSchema),
  userController.postUser
);

userRouter.put(RoutePath.HOME, authVerifier(), userController.putUser);

userRouter.delete(RoutePath.HOME, authVerifier(), userController.deleteUser);

export default userRouter;
