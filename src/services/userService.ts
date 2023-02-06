import Singleton from '@core/singleton';
import { User, UserDocument, UserModel } from '@models/user';

class UserService extends Singleton {
  static getInstance(): UserService {
    return super.getInstance(UserService);
  }

  async readUsers(): Promise<UserDocument[]> {
    return await UserModel.find();
  }

  async createUser(user: User): Promise<UserDocument> {
    const { email, password, fullName } = user;
    return await new UserModel({ email, password, fullName }).save();
  }

  async readUser(
    condition: Object,
    options = { password: false }
  ): Promise<UserDocument | null> {
    const { password } = options || {};
    if (password) {
      return await UserModel.findOne(condition).select('+password');
    }
    return await UserModel.findOne(condition);
  }

  async updateUser(): Promise<void> {}

  async deleteUser(): Promise<void> {}
}

const userService = UserService.getInstance();

export default userService;
