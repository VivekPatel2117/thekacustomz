import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./AdminDashboard.module.css";
import { getAllOrders, updateOrderStatus } from "../../services/order.api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ===============================
     FETCH ALL ORDERS
  ================================ */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ===============================
     UPDATE ORDER STATUS
  ================================ */
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, order_status: newStatus }
            : order
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update order status");
    }
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.amount || 0),
    0
  );

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.heading}>Admin Dashboard</h1>
    <div>
          <span className={styles.link} onClick={() => navigate("/create-product")}>
            Create Product
          </span>
          {" | "}
          <span
            className={styles.link}
            onClick={() => navigate("/create-collection")}
          >
            Create Collection
          </span>
        </div>
  
        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>

          <div className={styles.statCard}>
            <h3>Revenue</h3>
            <p>₹{totalRevenue}</p>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    {/* Clickable Order ID */}
                    <td
                      className={styles.link}
                      onClick={() =>
                        navigate(`/orders/${order.id}`)
                      }
                    >
                      #{order.id}
                    </td>

                    <td>{order.user_id}</td>

                    <td>
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>

                    <td>₹{order.amount}</td>

                    <td>
                      <span
                        className={`${styles.status} ${
                          styles[
                            order.order_status?.toLowerCase()
                          ]
                        }`}
                      >
                        {order.order_status}
                      </span>
                    </td>

                    <td>
                      <select
                        value={order.order_status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                      >
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}