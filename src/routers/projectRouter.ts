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

projectRouter.put(RoutePath.HOME, authVerifier(), projectController.putProject);

projectRouter.delete(
  RoutePath.HOME,
  authVerifier(),
  projectController.deleteProject
);

export default projectRouter;
