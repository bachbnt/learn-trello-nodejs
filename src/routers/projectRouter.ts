import RoutePath from '@constants/routePath';
import projectController from '@controllers/projectController';
import { authVerifier } from '@middleware/auth';
import { Router } from 'express';

const projectRouter = Router();

projectRouter.get(
  RoutePath.HOME,
  authVerifier(),
  projectController.getProjects
);

projectRouter.post(
  RoutePath.HOME,
  authVerifier(),
  projectController.postProject
);

export default projectRouter;
