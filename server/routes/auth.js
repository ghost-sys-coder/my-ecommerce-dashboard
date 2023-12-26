import { Router } from "express";
import { loginUser, logoutUser, registerUser, userProfile, verifyToken } from "../controllers/auth.js";


const router = Router();

/**
 * ! Create New User
 */
router.post("/register", registerUser);

/**
 * ? Verify verification token
 */
router.get('/verify/:token', verifyToken);

/**
 * ! Login User;
 */
router.post("/login", loginUser);

/**
 * ? Logout user
 */
router.post("/logout", logoutUser);

/**
 * ! Get user profile
 */
router.get("/profile", userProfile);

export default router;