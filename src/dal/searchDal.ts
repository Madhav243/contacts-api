import { Op } from "sequelize";
import { Contact, User } from "../models";


export class SearchDal {
    static async getUsersByNameInStart(name : string) : Promise<User[]> {
        const users = await User.findAll({where : {
            name : {
            [Op.like] :`${name}%`
        }
    }})

        return users
    }

    static async getUsersByName(name : string) : Promise<User[]> {
        const users = await User.findAll({
            where :{
                name : {
                    [Op.like] : `%${name}%`
                }
            }
        })
        return users
    }

    static async getUserByPhoneNumber(phoneNumber : string) :Promise<User | null> {
        return await User.findOne({
            where : {phoneNumber}
        })
    }

    static async getContactsByNameInStart(name : string) : Promise<Contact[]> {
        const contacts = await Contact.findAll({where : {name : 
        {
            [Op.like] :`${name}%`
        }    
        }})

        return contacts
    }

    static async getContactsByName(name : string) : Promise<Contact[]> {
        const contacts = await Contact.findAll({
            where :{
                name : {
                    [Op.like] : `%${name}%`
                }
            }
        })
        return contacts
    }

    static async getContactsByPhoneNumber(phoneNumber : string) : Promise<Contact[]> {
        const contacts = await Contact.findAll({
            where : {phoneNumber}
        })
        return contacts
    }
}