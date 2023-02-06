import Message from '@constants/Message';
import StatusCode from '@constants/statusCode';
import { Request, Response } from 'express';
import Singleton from './singleton';

export class HttpSuccess extends Object {
  statusCode: number;
  data: Object | Object[];
  constructor(
    statusCode: number = StatusCode.OK,
    data: Object | Object[] = {}
  ) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class HttpError extends Error {
  statusCode: number;
  message: string;
  constructor(
    statusCode: number = StatusCode.INTERNAL_SERVER_ERROR,
    message: string = Message.INTERNAL_SERVER_ERROR
  ) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

class HttpHandler extends Singleton {
  static getInstance(): HttpHandler {
    return super.getInstance(HttpHandler);
  }

  success(req: Request, res: Response, success: HttpSuccess) {
    res.status(success.statusCode).json(success);
  }

  error(req: Request, res: Response, error: Error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json(error);
    } else {
      httpHandler.error(req, res, new HttpError());
    }
  }
}

const httpHandler = HttpHandler.getInstance();
export default httpHandler;
