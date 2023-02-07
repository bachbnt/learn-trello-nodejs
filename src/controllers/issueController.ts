import Message from '@constants/message';
import StatusCode from '@constants/statusCode';
import httpHandler, { HttpError, HttpSuccess } from '@core/httpHandler';
import Singleton from '@core/singleton';
import authService from '@services/authService';
import issueService from '@services/issueService';
import projectService from '@services/projectService';
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
      const projectId = req.query.projectId;
      if (typeof projectId !== 'string') {
        throw new HttpError(StatusCode.BAD_REQUEST, Message.BAD_REQUEST);
      }

      const issues = await issueService.readIssues(projectId);

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
      const { name, type, priority, status, assigneeId, projectId } = req.body;

      const project = await projectService.readProject({ _id: projectId });
      if (!project) {
        throw new HttpError(StatusCode.BAD_REQUEST, Message.BAD_REQUEST);
      }
      const count = await issueService.countIssues(projectId);
      const key = `${project?.key}-${count + 1}`;

      const token = req.header('Authorization')!.split('Bearer ')[1];
      const decodedToken = await authService.verifyToken(token);
      const uid = decodedToken.uid;

      const newIssue = await issueService.createIssue({
        name,
        key,
        type,
        priority,
        status,
        assignee: assigneeId,
        reporter: uid,
        project: projectId,
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
