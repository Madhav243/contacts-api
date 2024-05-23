import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDAL } from '../dal/userDal';
import AppError from '../utils/appError';

export class AuthManager {
  static async register(userData: { name: string; phoneNumber: string; email?: string; password: string }) {
    const existingUser = await UserDAL.findByPhoneNumber(userData.phoneNumber);
    if (existingUser) {
      throw new AppError('User with this phone number already exists',409);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await UserDAL.create({ ...userData, password: hashedPassword });
    return user;
  }

  static async login(phoneNumber: string, password: string) {
    const user = await UserDAL.findByPhoneNumber(phoneNumber);
    if (!user) {
        throw new AppError('Invalid phone number or password',401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid phone number or password',401);
    }

    const token = jwt.sign({ id: user.id, phoneNumber: user.phoneNumber }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return { user, token };
  }
}
