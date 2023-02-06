import StatusCode from '@constants/statusCode';
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

      return res.status(StatusCode.OK).json({
        status: StatusCode.OK,
        data: users,
      });
    } catch (error: any) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        status: StatusCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
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

      return res.status(StatusCode.OK).json({
        status: StatusCode.OK,
        data: user,
      });
    } catch (error: any) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        status: StatusCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
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
