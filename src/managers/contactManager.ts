import { ContactDal } from "../dal/contactDal";
import { Contact, ContactInterface } from "../models/contactModel";
import AppError from "../utils/appError";
import { errorMessages } from "../utils/messageConstants";
import { StatusCodeEnum } from "../utils/statusCodesEnum";

export class ContactManager {
  static async addContact(userid: number, contactDetails: Partial<ContactInterface>) {
    try {
      const contact = {
        name : contactDetails.name,
        phoneNumber : contactDetails.phoneNumber,
        userId : userid,
        isSpam : false
      } as Omit<ContactInterface,'id'>
      return ContactDal.createContact(contact);
    } catch (error) {
      throw new AppError(
        `${errorMessages.databaseError}-: ${error}`,
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }
  }

  static async getContacts(userId: number) {
    try {
      const contacts = await ContactDal.getContactsByUserId(userId);
      return contacts;
    } catch (error) {
      throw new AppError(
        `${errorMessages.databaseError}-: ${error}`,
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }
  }

}
