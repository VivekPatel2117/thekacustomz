import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import api from "../../services/api";
import styles from "./OrderDetails.module.css";
import { useUserStore } from "../../store/useUserStore";
import { Navigate } from "react-router-dom";
export default function OrderDetails() {
    const currentUser = useUserStore((state) => state.user);


  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        /* ============================
   AUTHORIZATION CHECK
============================ */
if (
  res.data &&
  currentUser?.role !== "ADMIN" &&
  res.data.user_id !== currentUser?.id
) {
  return <Navigate to="/" replace />;
}
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!order) return <h2 style={{ textAlign: "center" }}>Order not found</h2>;

  const parsedDetails = JSON.parse(order.order_details || "{}");

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <h2 className={styles.heading}>Order Details</h2>

        <div className={styles.orderCard}>
          
          {/* ============================
              PRODUCT ITEMS FIRST
          ============================ */}
          <div className={styles.section}>
            <h3>Items</h3>

            <div className={styles.itemsWrapper}>
              {parsedDetails.items?.map((item, index) => (
                <div key={index} className={styles.itemCard}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />

                  <div className={styles.itemDetails}>
                    <p className={styles.itemName}>{item.name}</p>

                    <p className={styles.itemMeta}>
                      Qty: {item.quantity}
                    </p>

                    {item.size && (
                      <p className={styles.itemMeta}>
                        Size: {item.size}
                      </p>
                    )}

                    {item.color && (
                      <p className={styles.itemMeta}>
                        Color: {item.color}
                      </p>
                    )}
                  </div>

                  <div className={styles.itemPrice}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ============================
              ORDER INFO
          ============================ */}
          <div className={styles.section}>
            <h3>Order Info</h3>

            <div className={styles.row}>
              <span className={styles.label}>Order ID</span>
              <span className={styles.value}>{order.id}</span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Order Date</span>
              <span className={styles.value}>
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Payment Mode</span>
              <span className={styles.value}>
                {order.payment_mode}
              </span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Status</span>
              <span
                className={`${styles.status} ${
                  order.order_status === "Delivered"
                    ? styles.statusDelivered
                    : order.order_status === "Processing"
                    ? styles.statusProcessing
                    : order.order_status === "Cancelled"
                    ? styles.statusCancelled
                    : styles.statusPending
                }`}
              >
                {order.order_status}
              </span>
            </div>
          </div>

          {/* ============================
              SHIPPING INFO
          ============================ */}
          <div className={styles.section}>
            <h3>Shipping Details</h3>

            <p>{parsedDetails.shipping?.name}</p>
            <p>{parsedDetails.shipping?.phone}</p>
            <p>{parsedDetails.shipping?.address}</p>
            <p>
              {parsedDetails.shipping?.city},{" "}
              {parsedDetails.shipping?.state} -{" "}
              {parsedDetails.shipping?.pincode}
            </p>
          </div>

          {/* ============================
              TOTAL
          ============================ */}
          <div className={styles.totalBox}>
            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <span className={styles.grandTotal}>
                ₹{order.amount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}