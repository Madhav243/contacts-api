import { Request, Response, NextFunction } from "express";
import { AuthManager } from "../managers/authManager";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthManager.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { phoneNumber, password } = req.body;
      const { user, token } = await AuthManager.login(phoneNumber, password);
      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}
