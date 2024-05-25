import { Request, Response, NextFunction } from "express";
import { AuthManager } from "../managers/authManager";
import { StatusCodeEnum } from "../utils/statusCodesEnum";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthManager.register(req.body);
      res.status(StatusCodeEnum.SUCCESS).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { phoneNumber, password } = req.body;
      const { token } = await AuthManager.login(phoneNumber, password);
      res.status(StatusCodeEnum.SUCCESS).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
