import Message from '@constants/message';
import StatusCode from '@constants/statusCode';
import httpHandler, { HttpError, HttpSuccess } from '@core/httpHandler';
import Singleton from '@core/singleton';
import issueService from '@services/issueService';
import { NextFunction, Request, Response } from 'express';

class IssueController extends Singleton {
  static getInstance(): IssueController {
    return super.getInstance(IssueController);
  }

  async getIssues(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const issues = await issueService.readIssues();

      return httpHandler.success(
        req,
        res,
        new HttpSuccess(StatusCode.OK, issues)
      );
    } catch (error) {
      return httpHandler.error(req, res, new HttpError());
    }
  }

  async postIssue(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { name, key, ...others } = req.body;

      const issue = await issueService.readIssue({ key });
      if (issue) {
        throw new HttpError(StatusCode.BAD_REQUEST, Message.DUPLICATED);
      }

      const newIssue = await issueService.createIssue({
        name,
        key,
        ...others,
      });

      return httpHandler.success(
        req,
        res,
        new HttpSuccess(StatusCode.CREATED, newIssue)
      );
    } catch (error: any) {
      return httpHandler.error(req, res, error);
    }
  }

  async putIssue(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id, ...others } = req.body;

      const issue = await issueService.updateIssue({ _id: id }, { ...others });

      if (!issue) {
        throw new HttpError(StatusCode.BAD_REQUEST, Message.BAD_REQUEST);
      }

      return httpHandler.success(
        req,
        res,
        new HttpSuccess(StatusCode.OK, issue)
      );
    } catch (error: any) {
      return httpHandler.error(req, res, error);
    }
  }

  async deleteIssue(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.body;
      await issueService.deleteIssue({ _id: id });
      return httpHandler.success(req, res, new HttpSuccess());
    } catch (error: any) {
      return httpHandler.error(req, res, error);
    }
  }
}

const issueController = IssueController.getInstance();
export default issueController;
