import Message from '@constants/message';
import StatusCode from '@constants/statusCode';
import httpHandler, { HttpError, HttpSuccess } from '@core/httpHandler';
import Singleton from '@core/singleton';
import authService from '@services/authService';
import userService from '@services/userService';
import { NextFunction, Request, Response } from 'express';

class AuthController extends Singleton {
  static getInstance(): AuthController {
    return super.getInstance(AuthController);
  }

  async signIn(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body || {};

      const user = await userService.readUser({ email }, { password: true });
      if (!user) {
        throw new HttpError(StatusCode.BAD_REQUEST, Message.INCORRECT_EMAIL);
      }

      const isMatched = await authService.comparePassword(
        password,
        user.password
      );
      if (!isMatched) {
        throw new HttpError(StatusCode.BAD_REQUEST, Message.INCORRECT_PASSWORD);
      }

      const token = await authService.generateToken(user._id);
      return httpHandler.success(
        req,
        res,
        new HttpSuccess(StatusCode.OK, { token })
      );
    } catch (error: any) {
      return httpHandler.error(req, res, error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password, fullName } = req.body;
      const user = await userService.readUser({ email });
      if (user) {
        throw new HttpError(StatusCode.BAD_REQUEST, Message.TAKEN_EMAIL);
      }

      const hashedPassword = await authService.hashPassword(password);
      await userService.createUser({
        email,
        password: hashedPassword,
        fullName,
      });

      return httpHandler.success(req, res, new HttpSuccess());
    } catch (error: any) {
      return httpHandler.error(req, res, error);
    }
  }
}

const authController = AuthController.getInstance();

export default authController;
