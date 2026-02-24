import {
  addReviewVoteService,
  removeReviewVoteService,
  countReviewVotesService,
  hasUserVotedService,
} from "../services/reviewVote.service.js";

/**
 * POST /reviews/:reviewId/vote
 */
export const addReviewVote = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Login required to vote",
      });
    }

    const vote = await addReviewVoteService({
      review_id: reviewId,
      user_id,
    });

    res.status(201).json({
      success: true,
      data: vote,
      message: vote ? "Vote added" : "Already voted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * DELETE /reviews/:reviewId/vote
 */
export const removeReviewVote = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    const vote = await removeReviewVoteService({
      review_id: reviewId,
      user_id,
    });

    if (!vote) {
      return res.status(404).json({
        success: false,
        message: "Vote not found",
      });
    }

    res.json({ success: true, message: "Vote removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /reviews/:reviewId/votes/count
 */
export const getReviewVoteCount = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const count = await countReviewVotesService(reviewId);

    res.json({ success: true, data: { count } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /reviews/:reviewId/votes/me
 */
export const hasUserVoted = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const user_id = req.user?.id;

    if (!user_id) {
      return res.json({ success: true, data: { voted: false } });
    }

    const voted = await hasUserVotedService({
      review_id: reviewId,
      user_id,
    });

    res.json({ success: true, data: { voted } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
