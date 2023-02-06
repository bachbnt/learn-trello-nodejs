import Singleton from '@core/singleton';
import path from 'path';

class HomeService extends Singleton {
  static getInstance(): HomeService {
    return super.getInstance(HomeService);
  }

  async loadHomePage(): Promise<string> {
    return path.join(__dirname + '../../views/home.html');
  }
}

const homeService = HomeService.getInstance();

export default homeService;
