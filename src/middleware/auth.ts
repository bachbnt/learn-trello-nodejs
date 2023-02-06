import Message from '@constants/message';
import StatusCode from '@constants/statusCode';
import httpHandler, { HttpError } from '@core/httpHandler';
import authService from '@services/authService';
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'yup';

export const formValidator =
  (schema: ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      await schema.validate(req.body);
      next();
    } catch (error: any) {
      return httpHandler.error(req, res, error);
    }
  };

export const authVerifier =
  () =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const authorization = req.header('Authorization');
      const token = authorization && authorization.split('Bearer ')[1];
      console.log(token);

      if (!token) {
        throw new HttpError(StatusCode.UNAUTHORIZED, Message.UNAUTHORIZED);
      }

      const decodedToken = await authService.verifyToken(token);
      (req as any).uid = decodedToken.uid;
      next();
    } catch (error: any) {
      return httpHandler.error(req, res, error);
    }
  };
