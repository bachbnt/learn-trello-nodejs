import Singleton from '@core/singleton';
import homeService from '@services/homeService';
import { NextFunction, Request, Response } from 'express';

class HomeController extends Singleton {
  static getInstance(): HomeController {
    return super.getInstance(HomeController);
  }

  async getHome(req: Request, res: Response, next: NextFunction): Promise<any> {
    const homePage = await homeService.loadHomePage();
    return res.sendFile(homePage);
  }
}

const homeController = HomeController.getInstance();

export default homeController;
