import { ContactDal } from "../dal/contactDal";
import { UserDAL } from "../dal/userDal";
import { User } from "../models";
import { Contact, ContactInterface } from "../models/contactModel";
import AppError from "../utils/appError";
import { errorMessages } from "../utils/messageConstants";
import { StatusCodeEnum } from "../utils/statusCodesEnum";

export class SpamManager {
    static async markAsSpam(phoneNumber : string) : Promise<User | Contact | Contact[]> {
        try {
            // if registered user has same phone number
            const user = await UserDAL.findByPhoneNumber(phoneNumber)
            if(user) {
                return await UserDAL.markUserAsSpam(user)
            }
            // if contact is registered phone number
            const contacts = await ContactDal.getContactsByPhoneNumber(phoneNumber);
            if(Array.isArray(contacts) && contacts.length) {
                for(let contact of contacts) {
                    await ContactDal.markContactAsSpam(contact);
                    contact.isSpam = true
                }
                return [...contacts]
            }
            // if its random number
            const contact = {
                name : phoneNumber,
                phoneNumber : phoneNumber,
                userId : null,
                isSpam : true
              } as Omit<ContactInterface,'id'>
            const newContact = await ContactDal.createContact(contact)
            return newContact

        } catch(error) {
            throw new AppError(`${errorMessages.databaseError}-: ${error}`,
            StatusCodeEnum.INTERNAL_SERVER_ERROR)
        }
    }
}