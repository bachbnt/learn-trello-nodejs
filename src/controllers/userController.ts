import StatusCode from '@constants/statusCode';
import httpHandler, { HttpError, HttpSuccess } from '@core/httpHandler';
import Singleton from '@core/singleton';
import userService from '@services/userService';
import { NextFunction, Request, Response } from 'express';

class UserController extends Singleton {
  static getInstance(): UserController {
    return super.getInstance(UserController);
  }

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const users = await userService.readUsers();

      return httpHandler.success(
        req,
        res,
        new HttpSuccess(StatusCode.OK, users)
      );
    } catch (error: any) {
      return httpHandler.error(req, res, new HttpError());
    }
  }

  async postUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const _user = req.body;
      const user = await userService.createUser(_user);

      return httpHandler.success(
        req,
        res,
        new HttpSuccess(StatusCode.OK, user)
      );
    } catch (error: any) {
      return httpHandler.error(req, res, new HttpError());
    }
  }

  async putUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {}

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {}
}

const userController = UserController.getInstance();

export default userController;
