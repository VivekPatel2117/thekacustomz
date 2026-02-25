import { useState, useEffect } from "react";
import styles from "./AdminReview.module.css";
import { getAllReviews, updateReviewStatusApi } from "../../services/review.api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function AdminReviewPage() {
  // Initialize as empty array to receive API data
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAll = async () => {
    try {
      const res = await getAllReviews();
      // Set the state with the actual data from your API
      setReviews(res.data.data); 
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAll();
  }, []);

  const updateReviewStatus = async (id, newStatus) => {
    const res = await updateReviewStatusApi(id, newStatus);
    if (res.data.success) {
      alert(`Review ${newStatus}`);
      getAll(); // Refresh the list to show updated status
    } else {
      alert("Failed to update review status");
    }
    // In a real app, call your API here to update the DB status!
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, status: newStatus } : review
      )
    );
  };

  if (loading) return <div className={styles.container}>Loading reviews...</div>;

  return (
    <>
        <Navbar/>

    <div className={styles.container}>
      <h2 className={styles.heading}>Review Management <span onClick={()=> window.location.href = "/admin"} style={{ color: "blue", textDecoration:"underline"}}>Admin Dashboard</span></h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product ID</th> {/* Changed to ID as your JSON doesn't have names yet */}
            <th>User</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
{reviews.length === 0 ? (
            <tbody>
                <tr>
                  <td colSpan="7" className={styles.noReviews}>No reviews available.</td>
                </tr>
            </tbody>    
):(

        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              {/* Mapping to your specific API keys */}
              <td>{review.product_id}</td> 
              <td>{review.reviewer_name || "Anonymous"}</td>
              <td>{"⭐".repeat(review.rating)}</td>
              <td>{review.review_text}</td>
              <td>{new Date(review.created_at).toLocaleDateString()}</td>

              <td>
                <span className={`${styles.status} ${styles[review.status]}`}>
                  {review.status}
                </span>
              </td>

              <td>
                {review.status === "pending" ? (
                  <>
                    <button
                      className={styles.approveBtn}
                      onClick={() => updateReviewStatus(review.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className={styles.rejectBtn}
                      onClick={() => updateReviewStatus(review.id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className={styles.updatedLabel}>Updated</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
)}
      </table>
    </div>
        <Footer/>
    </>
  );
}