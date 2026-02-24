import express from "express";
import {
  createReview,
  getReviewsByProduct,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/productReview.controller.js";

const router = express.Router();

// Create review
router.post("/products/:productId/reviews", createReview);

// Read reviews by product
router.get("/products/:productId/reviews", getReviewsByProduct);

// Read single review
router.get("/reviews/:reviewId", getReviewById);

// Update review
router.patch("/reviews/:reviewId", updateReview);

// Delete review
router.delete("/reviews/:reviewId", deleteReview);

export default router;
