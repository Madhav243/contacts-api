import { Request, Response, NextFunction } from "express";
import { StatusCodeEnum } from "../utils/statusCodesEnum";
import { SearchManager } from "../managers/searchManager";

export class SearchController {
  static async searchByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;
      if (name && typeof name == "string") {
        const users = await SearchManager.searchByName(name);
        res.status(StatusCodeEnum.SUCCESS).json(users);
      } else {
        res.status(StatusCodeEnum.BAD_REQUEST);
      }
    } catch (error) {
      next(error);
    }
  }

  static async searchByPhoneNumber(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { phoneNumber } = req.query;
      if (phoneNumber && typeof phoneNumber == "string") {
        const users = await SearchManager.searchByPhoneNumber(phoneNumber);
        res.status(StatusCodeEnum.SUCCESS).json(users);
      } else {
        res.status(StatusCodeEnum.BAD_REQUEST);
      }
    } catch (error) {
      next(error);
    }
  }

  static async searchUserByPhoneNumber(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { phoneNumber } = req.query;
      if (phoneNumber && typeof phoneNumber == "string") {
        const users = await SearchManager.searchUserByPhoneNumber(
          req.user,
          phoneNumber
        );
        res.status(StatusCodeEnum.SUCCESS).json(users);
      } else {
        res.status(StatusCodeEnum.BAD_REQUEST);
      }
    } catch (error) {
      next(error);
    }
  }
}
