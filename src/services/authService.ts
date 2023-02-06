import Config from '@core/config';
import Singleton from '@core/singleton';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

class AuthService extends Singleton {
  static getInstance(): AuthService {
    return super.getInstance(AuthService);
  }

  async generateToken(id: string): Promise<string> {
    return jwt.sign({ uid: id }, Config.JWT_SECRET_TOKEN);
  }

  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, Config.JWT_SECRET_TOKEN);
  }

  async comparePassword(
    rawPassword: string,
    hashPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(rawPassword, hashPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }
}

const authService = AuthService.getInstance();

export default authService;
