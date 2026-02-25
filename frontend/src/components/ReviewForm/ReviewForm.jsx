import { useState } from "react";
import { createReviewApi, addReviewMediaApi } from "../../services/review.api";
import { useUserStore } from "../../store/useUserStore";
import styles from "../ReviewList/Review.module.css";
import { uploadReviewMedia } from "../../utils/uploadReviewMedia";

export default function ReviewForm({ productId, onSuccess }) {
  const { user } = useUserStore();

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState([]);
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    // STEP 1 — Upload images first
    const uploadedUrls = await Promise.all(
      [...images].map((img) => uploadReviewMedia(img))
    );

    // STEP 2 — Prepare form data
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("review_text", reviewText);
    formData.append(
      "review_title",
      `Review by ${user ? user.name : "Anonymous User"}`
    );
    formData.append("is_anonymous", anonymous);
    formData.append("reviewer_email", user?.email || "");
    formData.append("reviewer_name", user?.name || "Anonymous User");

    // STEP 3 — Create review
    const res = await createReviewApi(productId, formData);
    const reviewId = res.data.data.id;

    // STEP 4 — Save media links to DB
    if (uploadedUrls.length > 0) {
      await addReviewMediaApi(reviewId, {
        media_url: uploadedUrls,
        thumbnail_url: uploadedUrls[0] || null,
      });
    }

    alert("Review submitted!");
    setReviewText("");
    setImages([]);
    onSuccess?.();

  } catch (err) {
    console.error(err);
    alert("Failed to submit review");
  } finally {
    setLoading(false);
  }
};
  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
<p>Selected Rating: {rating}</p>
    <div className={styles.rating}>
  {[1, 2, 3, 4, 5].map((star) => {
    const isActive = star <= rating;

    return (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        className={`${styles.star} ${isActive ? styles.activeStar : ""}`}
      >
        ★
      </button>
    );
  })}
</div>

      {/* Anonymous toggle */}
      {user && (
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          Post as anonymous
        </label>
      )}

      <textarea
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setImages(e.target.files)}
      />

      <button disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}