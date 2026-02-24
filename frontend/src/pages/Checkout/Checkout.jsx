import { useState } from "react";
import { useCartStore } from "../..//store/useCartStore";
import styles from "./Checkout.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
export default function Checkout() {
    const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const discountAmount = useCartStore((state) => state.discountAmount);
  const orderNote = useCartStore((state) => state.orderNote);

  const finalTotal = totalAmount - (discountAmount || 0);

  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill required fields");
      return;
    }

    alert("Proceeding to payment gateway...");
    navigate("/payment-status");

    // Razorpay integration goes here
  };

  return (
    <>
    <Navbar/>
        <div className={styles.container}>
        {/* LEFT SIDE - FORM */}
        <div className={styles.left}>
            <h2>Checkout</h2>

            {/* LOGIN OPTION */}
            <div className={styles.loginToggle}>
            <span>Already have an account?</span>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Close Login" : "Login"}
            </button>
            </div>

            {isLogin && (
            <div className={styles.loginBox}>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className={styles.loginBtn}>Login</button>
            </div>
            )}

            {/* SHIPPING FORM */}
            <div className={styles.form}>
            <input
                name="name"
                placeholder="Full Name *"
                onChange={handleChange}
            />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="phone" placeholder="Phone *" onChange={handleChange} />
            <input
                name="address"
                placeholder="Address *"
                onChange={handleChange}
            />
            <div className={styles.row}>
                <input name="city" placeholder="City" onChange={handleChange} />
                <input name="state" placeholder="State" onChange={handleChange} />
            </div>
            <input name="pincode" placeholder="Pincode" onChange={handleChange} />

            <textarea
                placeholder="Order Notes"
                defaultValue={orderNote}
                readOnly
                style={{ background: "#80808052", outline: "none" }}
            />
            </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className={styles.right}>
            <h3>Order Summary</h3>

            {cart.map((item) => (
            <div key={item.cartItemId} className={styles.summaryItem}>
                <img
                src={item.image}
                style={{ height: "20vh", width: "15vw", objectFit: "contain" }}
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
            disabled={cart.length === 0}
            onClick={handlePayment}
            >
            Pay Now
            </button>
        </div>
        </div>
        <Footer/>
    </>
  );
}
