import RoutePath from '@constants/routePath';
import homeController from '@controllers/homeController';
import { Router } from 'express';

const homeRouter = Router();

homeRouter.get(RoutePath.HOME, homeController.getHome);

export default homeRouter;
