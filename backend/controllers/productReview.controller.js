import {
  createReviewService,
  getReviewsByProductService,
  getReviewByIdService,
  updateReviewService,
  deleteReviewService,
} from "../services/productReview.service.js";

/**
 * POST /products/:productId/reviews
 */
export const createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      rating,
      review_title,
      review_text,
      is_anonymous,
      reviewer_name,
      reviewer_email,
    } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const user_id = is_anonymous ? null : req.user?.id ?? null;

    const review = await createReviewService({
      product_id: productId,
      user_id,
      rating,
      review_title,
      review_text,
      is_anonymous: !!is_anonymous,
      reviewer_name,
      reviewer_email,
    });

    res.status(201).json({ success: true, data: review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /products/:productId/reviews
 */
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await getReviewsByProductService(productId);

    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /reviews/:reviewId
 */
export const getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await getReviewByIdService(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * PATCH /reviews/:reviewId
 */
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await updateReviewService(reviewId, req.body);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * DELETE /reviews/:reviewId
 */
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await deleteReviewService(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({ success: true, message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
