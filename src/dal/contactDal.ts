import { Contact, ContactInterface } from "../models/contactModel";

export class ContactDal {

  static async createContact(contact : Omit<ContactInterface,'id'>) : Promise<Contact> {
    return await Contact.create({...contact})
  }

  static async getContactsByUserId(userId: number): Promise<Contact[]> {
    return await Contact.findAll({ where: { userId } });
  }

  static async markContactAsSpam(phoneNumber: string): Promise<Contact | null> {
    const contact = await Contact.findOne({ where: { phoneNumber } });
    if (!contact) {
      return null;
    }
    contact.isSpam = true;
    await contact.save();
    return contact;
  }
}
