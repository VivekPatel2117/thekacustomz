import { useState, useEffect } from "react";
import { useCartStore } from "../../store/useCartStore";
import { useUserStore } from "../../store/useUserStore";
import styles from "./Checkout.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { createOrder } from "../../services/order.api";

export default function Checkout() {
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const discountAmount = useCartStore((state) => state.discountAmount);
  const orderNote = useCartStore((state) => state.orderNote);
  const clearCart = useCartStore((state) => state.clearCart);

  const user = useUserStore((state) => state.user);

  const finalTotal = totalAmount - (discountAmount || 0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  /* ================================
     PREFILL USER DATA
  ================================= */
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.full_name || "",
        email: user.email || "",
        phone: user.contact || "",
        address: user.address || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================================
     CREATE ORDER + PROCEED PAYMENT
  ================================= */
  const handlePayment = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill required fields");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      const orderPayload = {
        amount: finalTotal,
        payment_mode: "COD",
        order_details: {
          items: cart,
          shipping: form,
          note: orderNote || "",
        },
      };

      const res = await createOrder(orderPayload);

      clearCart();

      navigate("/payment-status", {
        state: { orderId: res.data.id },
      });

    } catch (err) {
      console.error(err);
      alert("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          <h2>Checkout</h2>

          <div className={styles.form}>
            <input
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone *"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              name="address"
              placeholder="Address *"
              value={form.address}
              onChange={handleChange}
            />

            <div className={styles.row}>
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
              />
              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
              />
            </div>

            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
            />

            <textarea
              placeholder="Order Notes"
              value={orderNote}
              readOnly
              style={{ background: "#80808052", outline: "none" }}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div key={item.cartItemId} className={styles.summaryItem}>
              <img
                src={item.image}
                style={{
                  height: "20vh",
                  width: "15vw",
                  objectFit: "contain",
                }}
                alt={item.name}
              />
              <div>
                <p>{item.name}</p>
                <span>
                  {item.color && `${item.color} | `}
                  {item.size}
                </span>
              </div>
              <div>₹{item.price * item.quantity}</div>
            </div>
          ))}

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>

          {discountAmount > 0 && (
            <div className={styles.discount}>
              <span>Discount</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}

          <div className={styles.total}>
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>

          <button
            className={styles.payBtn}
            disabled={cart.length === 0 || loading}
            onClick={handlePayment}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}