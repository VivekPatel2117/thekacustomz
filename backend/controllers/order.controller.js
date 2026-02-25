import * as orderService from "../services/order.service.js";
/* =========================
   CREATE ORDER
========================= */

export const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder({
      ...req.body,
      user_id: req.user.id, // from JWT
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET USER ORDERS
========================= */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUser(req.user.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET SINGLE ORDER
========================= */
export const getOrder = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE ORDER
========================= */
export const updateOrder = async (req, res) => {
  try {
    const order = await orderService.updateOrder(
      req.params.id,
      req.body
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   DELETE ORDER
========================= */
export const deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrder(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ============================
   GET ALL ORDERS (ADMIN ONLY)
============================ */
export const getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================
   GET ORDER BY ID
============================ */
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.user;

    const order = await orderService.getOrderByIdService(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Authorization check
    if (role !== "ADMIN" && order.user_id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================
   UPDATE ORDER STATUS
============================ */
export const updateOrderStatus = async (req, res) => {
  try {
   
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;
    const { order_status } = req.body;

    const updatedOrder = await orderService.updateOrderStatusService(
      id,
      order_status
    );

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};