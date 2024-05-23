import { User } from '../models/userModel';

export class UserDAL {
  static async create(userData: { name: string; phoneNumber: string; email?: string; password: string }) {
    return await User.create(userData);
  }

  static async findByPhoneNumber(phoneNumber: string) {
    return await User.findOne({ where: { phoneNumber } });
  }

  static async findById(id: number) {
    return await User.findByPk(id);
  }
}
