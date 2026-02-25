import {
  addReviewMediaService,
  getReviewMediaService,
  updateReviewMediaService,
  deleteReviewMediaService,
} from "../services/reviewMedia.service.js";

/**
 * POST /reviews/:reviewId/media
 */
export const addReviewMedia = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { media_url, thumbnail_url } = req.body;

    if (!media_url) {
      return res.status(400).json({
        success: false,
        message: "media_url is required",
      });
    }

    const media = await addReviewMediaService({
      review_id: reviewId,
      media_url,
      thumbnail_url,
    });

    res.status(201).json({ success: true, data: media });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /reviews/:reviewId/media
 */
export const getReviewMedia = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const media = await getReviewMediaService(reviewId);

    res.json({ success: true, data: media });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * PATCH /reviews/media/:mediaId
 */
export const updateReviewMedia = async (req, res) => {
  try {
    const { mediaId } = req.params;

    const media = await updateReviewMediaService(mediaId, req.body);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found",
      });
    }

    res.json({ success: true, data: media });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * DELETE /reviews/media/:mediaId
 */
export const deleteReviewMedia = async (req, res) => {
  try {
    const { mediaId } = req.params;

    const media = await deleteReviewMediaService(mediaId);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found",
      });
    }

    res.json({ success: true, message: "Media deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
