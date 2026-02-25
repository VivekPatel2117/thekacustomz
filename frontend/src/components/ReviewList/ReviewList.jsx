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
    setReviews(res.data.data);
    console.log("Fetched reviews:", res.data.data.length);
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

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

              {review.media_url?.split(",").map((img) => (
                <img
                  key={img}
                  src={img}
                  alt="review"
                  className={styles.reviewImage}
                />
              ))}

              
            </div>
          ))}
            </>
        )}
        </>
      )}
    </div>
  );
}
