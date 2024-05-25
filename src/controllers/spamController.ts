import { Request, Response, NextFunction } from "express";
import { SpamManager } from "../managers/spamManager";
import { StatusCodeEnum } from "../utils/statusCodesEnum";



export class SpamController {
    static async markAsSpam(req : Request , res : Response , next : NextFunction) {
        try {
            const { phoneNumber } = req.body
            const spammedPhone = await SpamManager.markAsSpam(phoneNumber)
            res.status(StatusCodeEnum.SUCCESS).json({spammedPhone})
        } catch(error) {
            next(error)
        }
    }
}