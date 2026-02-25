import sql from "../config/db.js";

/* =========================
   CREATE ORDER
========================= */
export const createOrder = async (data) => {
  const { user_id, amount, payment_mode, order_details } = data;

  const result = await sql`
    INSERT INTO orders (user_id, amount, payment_mode, order_details)
    VALUES (
      ${user_id},
      ${amount},
      ${payment_mode},
      ${JSON.stringify(order_details)}
    )
    RETURNING *
  `;

  return result[0];
};

/* =========================
   GET ALL ORDERS (ADMIN)
========================= */
export const getAllOrders = async () => {
  const result = await sql`
    SELECT * FROM orders
    ORDER BY created_at DESC
  `;

  return result;
};

/* =========================
   GET ORDERS BY USER
========================= */
export const getOrdersByUser = async (userId) => {
  const result = await sql`
    SELECT * FROM orders
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;

  return result;
};

/* =========================
   GET SINGLE ORDER
========================= */
export const getOrderById = async (id) => {
  const result = await sql`
    SELECT * FROM orders
    WHERE id = ${id}
  `;

  return result[0];
};

/* =========================
   UPDATE ORDER
========================= */
export const updateOrder = async (id, data) => {
  const { amount, payment_mode, order_details, status } = data;

  const result = await sql`
    UPDATE orders
    SET
      amount = ${amount},
      payment_mode = ${payment_mode},
      order_details = ${JSON.stringify(order_details)},
      status = ${status}
    WHERE id = ${id}
    RETURNING *
  `;

  return result[0];
};

/* =========================
   DELETE ORDER
========================= */
export const deleteOrder = async (id) => {
  await sql`
    DELETE FROM orders
    WHERE id = ${id}
  `;
};