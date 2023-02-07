import Message from '@constants/message';
import StatusCode from '@constants/statusCode';
import httpHandler, { HttpError, HttpSuccess } from '@core/httpHandler';
import Singleton from '@core/singleton';
import authService from '@services/authService';
import projectService from '@services/projectService';
import userService from '@services/userService';
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
      const { name, key } = req.body;

      const project = await projectService.readProject({ key });
      if (project) {
        throw new HttpError(StatusCode.BAD_REQUEST, Message.DUPLICATED);
      }

      const token = req.header('Authorization')!.split('Bearer ')[1];
      const decodedToken = await authService.verifyToken(token);
      const uid = decodedToken.uid;
      const user = await userService.readUser({ _id: uid });

      if (!user) {
        throw new HttpError(StatusCode.BAD_REQUEST, Message.BAD_REQUEST);
      }

      const newProject = await projectService.createProject({
        name,
        key,
        members: [user],
      });

      return httpHandler.success(
        req,
        res,
        new HttpSuccess(StatusCode.CREATED, newProject)
      );
    } catch (error: any) {
      return httpHandler.error(req, res, error);
    }
  }

  async putProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id, ...others } = req.body;

      const project = await projectService.updateProject(
        { _id: id },
        { ...others }
      );

      if (!project) {
        throw new HttpError(StatusCode.BAD_REQUEST, Message.BAD_REQUEST);
      }

      return httpHandler.success(
        req,
        res,
        new HttpSuccess(StatusCode.OK, project)
      );
    } catch (error: any) {
      return httpHandler.error(req, res, error);
    }
  }

  async deleteProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.body;
      await projectService.deleteProject({ _id: id });
      return httpHandler.success(req, res, new HttpSuccess());
    } catch (error: any) {
      return httpHandler.error(req, res, error);
    }
  }
}

const projectController = ProjectController.getInstance();
export default projectController;
