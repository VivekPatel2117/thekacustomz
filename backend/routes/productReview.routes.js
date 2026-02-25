import express from "express";
import {
  createReview,
  getReviewsByProduct,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReviews,
  updateReviewStatus,
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

router.put("/reviews/:reviewId/status", updateReviewStatus);
// Delete review
router.delete("/reviews/:reviewId", deleteReview);

router.get("/reviews", getAllReviews);
export default router;
