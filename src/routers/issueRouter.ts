import RoutePath from '@constants/routePath';
import issueController from '@controllers/issueController';
import { authVerifier } from '@middleware/auth';
import { Router } from 'express';

const issueRouter = Router();

issueRouter.get(RoutePath.HOME, authVerifier(), issueController.getIssues);

issueRouter.post(RoutePath.HOME, authVerifier(), issueController.postIssue);

export default issueRouter;
