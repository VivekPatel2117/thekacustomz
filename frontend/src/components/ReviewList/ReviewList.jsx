import { useEffect, useState } from "react";
import {
  getReviewsByProductApi,
  voteReviewApi,
  removeVoteApi,
  getVoteCountApi,
  hasUserVotedApi,
} from "../../services/review.api";
import styles from "./Review.module.css";

export default function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const res = await getReviewsByProductApi(productId);
    setReviews(res.data);
    console.log("Fetched reviews:", res.data.data.length);
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleVote = async (reviewId) => {
    await voteReviewApi(reviewId);
    fetchReviews();
  };

  return (
    <div className={styles.reviewList}>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        <>
        {reviews.length > 0 && (
            <>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <strong>
                  {review.is_anonymous
                    ? "Anonymous User"
                    : review.reviewer_name}
                </strong>

                <div>{"★".repeat(review.rating)}</div>
              </div>

              <p>{review.review_text}</p>

              {review.media?.map((img) => (
                <img
                  key={img.media_url}
                  src={img.media_url}
                  alt="review"
                  className={styles.reviewImage}
                />
              ))}

              <button onClick={() => handleVote(review.id)}>👍 Helpful</button>
            </div>
          ))}
            </>
        )}
        </>
      )}
    </div>
  );
}
