import { Request, Response, NextFunction } from "express";
import { ContactManager } from "../managers/contactManager";
import { StatusCodeEnum } from "../utils/statusCodesEnum";

export class ContactController {
  static async getContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const contacts = await ContactManager.getContacts(req.user.id);
      res.status(StatusCodeEnum.SUCCESS).json(contacts);
    } catch (error) {
      next(error);
    }
  }

  static async addContact(req: Request, res: Response, next: NextFunction) {
    try {
      await ContactManager.addContact(req.user.id, req.body);
      res.status(StatusCodeEnum.SUCCESS).send('Success');
    } catch (error) {
      next(error);
    }
  }

  static async markContactAsSpam(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { phoneNumber } = req.body;
      const contact = await ContactManager.markContactAsSpam(phoneNumber);
      res.status(StatusCodeEnum.SUCCESS).json(contact);
    } catch (error) {
      next(error);
    }
  }
}
