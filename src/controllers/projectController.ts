import Message from '@constants/message';
import StatusCode from '@constants/statusCode';
import httpHandler, { HttpError, HttpSuccess } from '@core/httpHandler';
import Singleton from '@core/singleton';
import projectService from '@services/projectService';
import { NextFunction, Request, Response } from 'express';

class ProjectController extends Singleton {
  static getInstance(): ProjectController {
    return super.getInstance(ProjectController);
  }

  async getProjects(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const projects = await projectService.readProjects();

      return httpHandler.success(
        req,
        res,
        new HttpSuccess(StatusCode.OK, projects)
      );
    } catch (error) {
      return httpHandler.error(req, res, new HttpError());
    }
  }

  async postProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { name, key, ...others } = req.body;

      const project = await projectService.readProject({ key });
      if (project) {
        throw new HttpError(StatusCode.BAD_REQUEST, Message.DUPLICATED);
      }

      await projectService.createProject({ name, key, ...others });

      return httpHandler.success(req, res, new HttpSuccess());
    } catch (error: any) {
      return httpHandler.error(req, res, error);
    }
  }
}

const projectController = ProjectController.getInstance();
export default projectController;
