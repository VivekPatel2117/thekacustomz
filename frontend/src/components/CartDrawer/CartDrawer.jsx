import { useEffect } from "react";
import { useCartStore } from "../../store/useCartStore";
import styles from "./CartDrawer.module.css";
import QuantityCounter from "../QuantityCounter/QuantityCounter";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ isOpen, onClose }) {
  const cart = useCartStore((state) => state.cart);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const discountAmount = useCartStore((state) => state.discountAmount);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const setOrderNote = useCartStore((state) => state.setOrderNote);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const finalTotal = totalAmount - (discountAmount || 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2>Your Cart</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Items */}
        <div className={styles.items}>
          {cart.length === 0 ? (
            <p className={styles.empty}>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.cartItemId} className={styles.item}>
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                />

                {/* Details */}
                <div className={styles.itemDetails}>
                  <p className={styles.name}>{item.name}</p>

                  <p className={styles.meta}>
                    {item.color && <>Color: {item.color} | </>}
                    {item.size && <>Size: {item.size}</>}
                  </p>

                  <QuantityCounter
                    value={item.quantity}
                    onChange={(val) =>
                      updateQuantity(item.cartItemId, val)
                    }
                  />

                  <button
                    className={styles.removeBtn}
                    onClick={() =>
                      removeFromCart(item.cartItemId)
                    }
                  >
                    Remove
                  </button>
                </div>

                {/* Price */}
                <div className={styles.price}>
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Section */}
        {cart.length > 0 && (
          <>
            {/* Order Notes */}
            <div className={styles.notesSection}>
              <textarea
                placeholder="Add notes for your order (e.g., print instructions)"
                onChange={(e) => setOrderNote(e.target.value)}
              />
            </div>

            {/* Totals */}
            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              {discountAmount > 0 && (
                <div className={styles.discountRow}>
                  <span>Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className={styles.finalTotal}>
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
                className={styles.checkoutBtn}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}