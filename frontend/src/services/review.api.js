import api from "./api";

/* =========================
   CREATE REVIEW
========================= */
export const createReviewApi = (productId, data) => {
  return api.post(`/products/${productId}/reviews`, data);
};

export const addReviewMediaApi = (reviewId, mediaData) => {
  return api.post(`/reviews/${reviewId}/media`, mediaData);
}

/* =========================
   GET REVIEWS BY PRODUCT
========================= */
export const getReviewsByProductApi = (productId) => {
  return api.get(`/products/${productId}/reviews`);
};

/* =========================
   VOTE REVIEW
========================= */
export const voteReviewApi = (reviewId) => {
  return api.post(`/reviews/${reviewId}/vote`);
};

export const removeVoteApi = (reviewId) => {
  return api.delete(`/reviews/${reviewId}/vote`);
};

export const getAllReviews = () => {
  return api.get("/reviews");
};

export const getVoteCountApi = (reviewId) => {
  return api.get(`/reviews/${reviewId}/votes/count`);
};

export const hasUserVotedApi = (reviewId) => {
  return api.get(`/reviews/${reviewId}/votes/me`);
};

export const updateReviewStatusApi = (reviewId, status) => {
  return api.put(`/reviews/${reviewId}/status`, {
    review_status: status,
  });
};