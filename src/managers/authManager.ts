import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDAL } from "../dal/userDal";
import AppError from "../utils/appError";
import { errorMessages } from "../utils/messageConstants";
import { StatusCodeEnum } from "../utils/statusCodesEnum";
import { User } from "../models";
import { UserInterface } from "../models/userModel";

export class AuthManager {
  static async register(userData: Omit<UserInterface, "id">) : Promise<User> {
    try {
      const existingUser = await UserDAL.findByPhoneNumber(
        userData.phoneNumber
      );
      if (existingUser) {
        throw new AppError(
          errorMessages.userAlreadyExists,
          StatusCodeEnum.CONFLICT
        );
      }

      const hashedPassword = await bcrypt.hash(
        userData.password,
        +`${process.env.HASH_ALGO_ITERATIONS ?? 10}`
      );
      const user = await UserDAL.create({
        ...userData,
        password: hashedPassword,
      });
      return user.toJSON() as User;
    } catch (error) {
      throw new AppError(
        `${errorMessages.databaseError}-: ${error}`,
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }
  }

  static async login(phoneNumber: string, password: string) {
    try {
      const user = await UserDAL.findByPhoneNumber(phoneNumber);
      if (!user) {
        throw new AppError(
          errorMessages.invalidPhoneOrPassword,
          StatusCodeEnum.UNAUTHORIZED
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new AppError(
          errorMessages.invalidPhoneOrPassword,
          StatusCodeEnum.UNAUTHORIZED
        );
      }

      const token = jwt.sign(
        { id: user.id, phoneNumber: user.phoneNumber },
        process.env.JWT_SECRET!,
        {
          expiresIn: `${process.env.JWT_EXPIRE_TIME}`,
        }
      );

      return { token };
    } catch (error) {
      throw new AppError(
        `${errorMessages.databaseError}-: ${error}`,
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }
  }
}
