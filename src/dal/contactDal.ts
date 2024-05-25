import { Contact, ContactInterface } from "../models/contactModel";

export class ContactDal {

  static async createContact(contact : Omit<ContactInterface,'id'>) : Promise<Contact> {
    console.log('Before DALLL -: ',contact)
    const newContact =  await Contact.create(contact)
    console.log('After DALL -: ',newContact)
    return newContact
  }

  static async getContactsByUserId(userId: number): Promise<Contact[]> {
    return await Contact.findAll({ where: { userId } });
  }

  static async getContactsByPhoneNumber(phoneNumber : string) : Promise<Contact[] | null> {
    return await Contact.findAll({ where : {phoneNumber}});
  }

  static async markContactAsSpam(contact : Contact): Promise<Contact> {
    contact.isSpam = true;
    await contact.save();
    return contact;
  }
}
