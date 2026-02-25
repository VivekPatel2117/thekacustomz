import express from "express";
import * as orderController from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* USER ROUTES */
router.post("/", authMiddleware, orderController.createOrder);
router.get("/my", authMiddleware, orderController.getMyOrders);

/* ADMIN ROUTES */
router.get("/", authMiddleware, orderController.getAllOrders);
router.get("/:id", authMiddleware, orderController.getOrder);
router.put("/:id", authMiddleware, orderController.updateOrder);
router.delete("/:id", authMiddleware, orderController.deleteOrder);
router.put("/:id/status", orderController.updateOrderStatus);
export default router;