import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Profile.module.css";
import { getProfile, updateProfile } from "../../services/users.api";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({});
  const [loading, setLoading] = useState(true);

  /* ============================
     FETCH USER + ORDERS
  ============================ */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/users/dashboard");
        setUser(res.data);
        setTempUser(res.data.user);
        setOrders(res.data.orders);
        console.log(res.data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  /* ============================
     HANDLE INPUT CHANGE
  ============================ */
  const handleChange = (e) => {
    setTempUser({ ...tempUser, [e.target.name]: e.target.value });
  };

  /* ============================
     UPDATE PROFILE
  ============================ */
  const handleSave = async () => {
    try {
      if (!tempUser.full_name || !tempUser.email) {
        alert("Full name and email are required");
        return;
      }

      const res = await updateProfile(tempUser);
      setUser(res.data);
      setEditMode(false);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Error updating profile");
    }
  };

  const handleCancel = () => {
    setTempUser(user);
    setEditMode(false);
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1 className={styles.heading}>My Profile</h1>
       {user?.role === "ADMIN" && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button style={{ background: "black", color: "white", padding:"1.5vh 3vw", border: "none", width: "fit-content", borderRadius: "10px"}}
              className={styles.adminBtn}
              onClick={() => navigate("/ADMIN")}
            >
              Admin Dashboard
            </button>
          </div>
        )}
        </div>
       
        {/* PROFILE CARD */}
        <div className={styles.profileCard}>
          {!editMode ? (
            <>
              <div>
                <h2>{user?.full_name}</h2>
                <p>{user?.email}</p>
                <p>{user?.contact || "No contact added"}</p>
                <p>{user?.address || "No address added"}</p>
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
                name="full_name"
                value={tempUser.full_name || ""}
                onChange={handleChange}
                placeholder="Full Name"
              />

              <input
                name="email"
                value={tempUser.email || ""}
                onChange={handleChange}
                placeholder="Email"
              />

              <input
                name="contact"
                value={tempUser.contact || ""}
                onChange={handleChange}
                placeholder="Phone"
              />

              <input
                name="address"
                value={tempUser.address || ""}
                onChange={handleChange}
                placeholder="Address"
              />

              <div className={styles.buttonRow}>
                <button className={styles.saveBtn} onClick={handleSave}>
                  Save
                </button>
                <button className={styles.cancelBtn} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ============================
            ORDERS SECTION
        ============================ */}
        <h2 className={styles.ordersHeading}>My Orders</h2>

        <div className={styles.ordersWrapper}>
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div>
                    <p className={styles.orderId}>Order ID: {order.id}</p>
                    <span className={styles.date}>
                      {new Date(order.created_at).toLocaleDateString()}
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
                  <strong>₹{order.amount}</strong>
                </div>

                {/* 🔥 DETAILS BUTTON */}
                <button
                  className={styles.detailsBtn}
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View Details →
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <div
        style={{ display: "flex", padding: "1%", justifyContent: "flex-end" }}
      >
        <button
          style={{
            background: "black",
            color: "white",
            borderRadius: "10px",
            border: "none",
            padding: "1vh 2vh",
          }}
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}
