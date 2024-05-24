import { User, UserInterface } from '../models/userModel';

export class UserDAL {
  static async create(userData: Omit<UserInterface,'id'>) {
    return await User.create(userData);
  }

  static async findByPhoneNumber(phoneNumber: string) {
    return await User.findOne({ where: { phoneNumber } });
  }

  static async findById(id: number) {
    return await User.findByPk(id);
  }

  static async markUserAsSpam(phoneNumber: string) {
    const user = await User.findOne({ where: { phoneNumber } });
    if (user) {
      user.isSpam = true;
      await user.save();
    }
    return user;
  }
}
