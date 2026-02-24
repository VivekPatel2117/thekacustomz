import { useEffect, useState } from "react";
import { useCartStore } from "../../store/useCartStore";
import styles from "./PaymentStatus.module.css";

export default function PaymentStatus() {
  const clearCart = useCartStore((state) => state.clearCart);
  const [status, setStatus] = useState("processing"); 
  // processing | success

  useEffect(() => {
    // simulate payment verification delay
    const timer = setTimeout(() => {
      setStatus("success");
      clearCart(); // clear cart after payment success
    }, 3000);

    return () => clearTimeout(timer);
  }, [clearCart]);

  return (
    <div className={styles.container}>
      {status === "processing" ? (
        <div className={styles.card}>
          <div className={styles.spinner}></div>
          <h2>Processing Payment...</h2>
          <p>Please wait while we confirm your payment.</p>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.successIcon}>✓</div>
          <h2>Payment Completed!</h2>
          <p>Your order has been placed successfully.</p>
          <button
            className={styles.homeBtn}
            onClick={() => (window.location.href = "/")}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}