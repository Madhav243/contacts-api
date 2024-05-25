import { SearchDal } from "../dal/searchDal";
import { UserInterface } from "../models/userModel";
import AppError from "../utils/appError";
import { errorMessages } from "../utils/messageConstants";
import { StatusCodeEnum } from "../utils/statusCodesEnum";
import { ContactManager } from "./contactManager";



export class SearchManager {
    static async searchByName(query : string) {
        try {
            const [usersWithNameInStart,contactsWithNameInStart,users,contacts] = await Promise.all(
                [
                    SearchDal.getUsersByNameInStart(query),
                    SearchDal.getContactsByNameInStart(query),
                    SearchDal.getUsersByName(query),
                    SearchDal.getContactsByName(query)
                ]
            )
            return [...usersWithNameInStart,...contactsWithNameInStart,...users,...contacts]

        } catch(error) {
            throw new AppError(`${errorMessages.databaseError}-: ${error}`,
            StatusCodeEnum.INTERNAL_SERVER_ERROR)
        }
    }

    static async searchByPhoneNumber(phoneNumber : string) {
        try {
            const user = await SearchDal.getUserByPhoneNumber(phoneNumber)
            if(user) return user.toJSON()
            const contacts = await SearchDal.getContactsByPhoneNumber(phoneNumber)
            return Array.isArray(contacts) && contacts.length ? [...contacts] : []
        } catch(error) {
            throw new AppError(`${errorMessages.databaseError}-: ${error}`,
            StatusCodeEnum.INTERNAL_SERVER_ERROR)
        }
    }

    static async searchUserByPhoneNumber(requestedUser : UserInterface  , phoneNumber : string) {
        try {  
            const user = await SearchDal.getUserByPhoneNumber(phoneNumber)
            if(user) {
                const contacts = await ContactManager.getContacts(user.id);
                const foundUser = contacts.find(contact => contact.phoneNumber == requestedUser.phoneNumber)
                if(!foundUser) {
                    user.email = ''
                }
            }
            return user?.toJSON()
        } catch(error) {
            throw new AppError(`${errorMessages.databaseError}-: ${error}`,
            StatusCodeEnum.INTERNAL_SERVER_ERROR)
        }
    }
    
}