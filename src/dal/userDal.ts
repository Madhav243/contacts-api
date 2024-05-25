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

  static async markUserAsSpam(user : User) : Promise<User> {
    user.isSpam = true
    return await user.save()
  }
}
