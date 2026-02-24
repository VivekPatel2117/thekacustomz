import express from "express";
import {
  addReviewMedia,
  getReviewMedia,
  updateReviewMedia,
  deleteReviewMedia,
} from "../controllers/reviewMedia.controller.js";

const router = express.Router();

// Create media
router.post("/reviews/:reviewId/media", addReviewMedia);

// Read media
router.get("/reviews/:reviewId/media", getReviewMedia);

// Update media
router.patch("/reviews/media/:mediaId", updateReviewMedia);

// Delete media
router.delete("/reviews/media/:mediaId", deleteReviewMedia);

export default router;
