import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { SearchController } from "../controllers/searchController";


const router = Router()

router.get('/name',authMiddleware,SearchController.searchByName);
router.get('/phoneNumber',authMiddleware,SearchController.searchByPhoneNumber);
router.get('/user',authMiddleware,SearchController.searchUserByPhoneNumber);

export default router;