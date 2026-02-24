import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Profile.module.css";

export default function Profile() {
  // ✅ Editable User State
  const [user, setUser] = useState({
    name: "Vivek Patel",
    email: "vivek@example.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra, India",
  });

  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  // Sample Orders
  const orders = [
    {
      id: "ORD12345",
      date: "12 Feb 2026",
      total: 1499,
      status: "Delivered",
      items: [
        {
          name: "Custom Avatar T-Shirt",
          image: "https://via.placeholder.com/70",
        },
      ],
    },
  ];

  const handleChange = (e) => {
    setTempUser({ ...tempUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!tempUser.name || !tempUser.email) {
      alert("Name and Email required");
      return;
    }

    setUser(tempUser);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempUser(user);
    setEditMode(false);
  };

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.heading}>My Profile</h1>

        {/* PROFILE CARD */}
        <div className={styles.profileCard}>
          {!editMode ? (
            <>
              <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.address}</p>
              </div>

              <button
                className={styles.editBtn}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <div className={styles.editForm}>
              <input
                name="name"
                value={tempUser.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <input
                name="email"
                value={tempUser.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                name="phone"
                value={tempUser.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <input
                name="address"
                value={tempUser.address}
                onChange={handleChange}
                placeholder="Address"
              />

              <div className={styles.buttonRow}>
                <button
                  className={styles.saveBtn}
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ORDERS */}
        <h2 className={styles.ordersHeading}>My Orders</h2>

        <div className={styles.ordersWrapper}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div>
                  <p className={styles.orderId}>
                    Order ID: {order.id}
                  </p>
                  <span className={styles.date}>
                    {order.date}
                  </span>
                </div>

                <span
                  className={`${styles.status} ${
                    order.status === "Delivered"
                      ? styles.delivered
                      : styles.processing
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className={styles.orderFooter}>
                <span>Total</span>
                <strong>₹{order.total}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}