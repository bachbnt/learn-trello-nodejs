import 'dotenv/config';

class Config {
  static readonly ENVIRONMENT = process.env.ENVIRONMENT || 'development';
  static readonly HOST = process.env.HOST || 'localhost';
  static readonly PORT = process.env.PORT || 3000;
  static readonly DATABASE_URL = process.env.DATABASE_URL || '';
  static readonly JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN || '';
}

export default Config;
