import { useState } from "react";
import { createReviewApi } from "../../services/review.api";
import { useUserStore } from "../../store/useUserStore";
import styles from "../ReviewList/Review.module.css";

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

      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("review_text", reviewText);
      formData.append("is_anonymous", anonymous);

      if (!user) {
        formData.append("reviewer_name", "Anonymous User");
      }

      [...images].forEach((img) =>
        formData.append("media", img)
      );

      await createReviewApi(productId, formData);

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