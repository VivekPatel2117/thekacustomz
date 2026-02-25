import api from "./api";

/* ===============================
   CREATE ORDER
=============================== */
export const createOrder = async (orderData) => {
  return await api.post("/orders", orderData);
};

/* ===============================
   GET MY ORDERS (Logged User)
=============================== */
export const getMyOrders = async () => {
  return await api.get("/orders/my");
};

/* ===============================
   GET ALL ORDERS (Admin)
=============================== */
export const getAllOrders = async () => {
  return await api.get("/orders");
};

/* ===============================
   GET SINGLE ORDER
=============================== */
export const getOrderById = async (id) => {
  return await api.get(`/orders/${id}`);
};

/* ===============================
   UPDATE ORDER
=============================== */
export const updateOrder = async (id, data) => {
  return await api.put(`/orders/${id}`, data);
};

/* ===============================
   DELETE ORDER
=============================== */
export const deleteOrder = async (id) => {
  return await api.delete(`/orders/${id}`);
};

/* ===============================
   UPDATE ORDER STATUS
================================ */
export const updateOrderStatus = (id, status) => {
  return api.put(`/orders/${id}/status`, {
    order_status: status,
  });
};