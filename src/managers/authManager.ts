import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDAL } from '../dal/userDal';
import AppError from '../utils/appError';
import { UserInterface } from '../models/userModel';
import { errorMessages } from '../utils/messageConstants';
import { StatusCodeEnum } from '../utils/statusCodesEnum';

export class AuthManager {
  static async register(userData: UserInterface) {
    const existingUser = await UserDAL.findByPhoneNumber(userData.phoneNumber);
    if (existingUser) {
      throw new AppError(errorMessages.userAlreadyExists,StatusCodeEnum.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(userData.password, `${process.env.HASH_ALGO_ITERATIONS ?? 10}`);
    const user = await UserDAL.create({ ...userData, password: hashedPassword });
    return user;
  }

  static async login(phoneNumber: string, password: string) {
    const user = await UserDAL.findByPhoneNumber(phoneNumber);
    if (!user) {
        throw new AppError(errorMessages.invalidPhoneOrPassword,StatusCodeEnum.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(errorMessages.invalidPhoneOrPassword,StatusCodeEnum.UNAUTHORIZED);
    }

    const token = jwt.sign({ id: user.id, phoneNumber: user.phoneNumber }, process.env.JWT_SECRET!, {
      expiresIn: `${process.env.JWT_EXPIRE_TIME}`,
    });

    return { user, token };
  }
}
