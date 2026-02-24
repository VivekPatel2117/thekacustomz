import { useEffect, useState } from "react";
import { useCartStore } from "../../store/useCartStore";
import styles from "./CartDrawer.module.css";
import VariantSelector from "../VariantSelector/VariantSelector";
import QuantityCounter from "../QuantityCounter/QuantityCounter";
import { useNavigate } from "react-router-dom";
export default function CartDrawer({ isOpen, onClose }) {
  const cart = useCartStore((state) => state.cart);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const discountAmount = useCartStore((state) => state.discountAmount);
  const coupon = useCartStore((state) => state.coupon);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const setOrderNote = useCartStore((state) => state.setOrderNote);

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const finalTotal = totalAmount - (discountAmount || 0);

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
        onClick={onClose}
      />

      <div
        className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>Your Cart</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className={styles.items}>
          {cart.length === 0 ? (
            <p className={styles.empty}>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.cartItemId} className={styles.item}>
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                />

                <div style={{ borderLeft:"1px solid gray", borderRight:" 1px solid gray", padding:"0% 2%", marginRight:"1%"}} className={styles.itemDetails}>
                  <p className={styles.name}>{item.name}</p>

                  <p className={styles.meta}>
                    {item.color && <>Color: {item.color} | </>}
                    {item.size && <>Size: {item.size}</>}
                  </p>

                  <div className={styles.qtyControls}>
                    <QuantityCounter
                      value={item.quantity}
                      onChange={(val) => updateQuantity(item.cartItemId, val)}
                    />
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() =>
                      removeFromCart(item.cartItemId)
                    }
                  >
                    Remove
                  </button>
                </div>

                <div className={styles.price}>
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))
          )}
        </div>

        {/* COUPON SECTION */}
        {cart.length > 0 && (
          <div className={styles.couponSection}>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
            />

            {!coupon ? (
              <button
                className={styles.applyBtn}
                onClick={() => {
                  const success = applyCoupon(couponInput.trim());
                  if (!success) alert("Invalid coupon");
                }}
              >
                Apply
              </button>
            ) : (
              <button onClick={() => applyCoupon(null)}>
                Remove
              </button>
            )}
          </div>
        )}

        {/* ORDER NOTES */}
        {cart.length > 0 && (
          <div className={styles.notesSection}>
            <textarea
              placeholder="Add notes for your order (e.g., print instructions)"
              onChange={(e) => setOrderNote(e.target.value)}
            />
          </div>
        )}

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
            <span> ₹{finalTotal}</span>
          </div>

          <button
          onClick={()=> navigate("/checkout")}
            className={styles.checkoutBtn}
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}