import express from "express";
import * as userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/profile", authMiddleware, userController.getProfile);
router.put("/profile", authMiddleware, userController.updateProfile);
router.get("/dashboard", authMiddleware, userController.getProfileWithOrders);
export default router;