import express from "express";
import {
  addReviewVote,
  removeReviewVote,
  getReviewVoteCount,
  hasUserVoted,
} from "../controllers/reviewVote.controller.js";

const router = express.Router();

// Add helpful vote
router.post("/reviews/:reviewId/vote", addReviewVote);

// Remove vote
router.delete("/reviews/:reviewId/vote", removeReviewVote);

// Get vote count
router.get("/reviews/:reviewId/votes/count", getReviewVoteCount);

// Check if current user voted
router.get("/reviews/:reviewId/votes/me", hasUserVoted);

export default router;
