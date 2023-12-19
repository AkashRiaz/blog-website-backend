import express from 'express';
import { loginUser, resisterUser, updateProfilePicture, updateUserProfile, userProfile } from '../controllers/userControllers.js';
import { authGuard } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/resister", resisterUser)
router.post("/login", loginUser)
router.get("/profile",authGuard, userProfile)
router.put("/updateProfile", authGuard, updateUserProfile)
router.put("/updateProfilePicture", authGuard, updateProfilePicture)

export default router