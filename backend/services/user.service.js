import sql from "../config/db.js";

/* =========================
   CREATE USER
========================= */
export const createUser = async (user) => {
  const { full_name, email, password } = user;

  const result = await sql`
    INSERT INTO users (full_name, email, password)
    VALUES (${full_name}, ${email}, ${password})
    RETURNING id, full_name, email, created_at
  `;

  return result[0];
};

/* =========================
   FIND USER BY EMAIL
========================= */
export const findUserByEmail = async (email) => {
  const result = await sql`
    SELECT * FROM users
    WHERE email = ${email}
  `;

  return result[0];
};

/* =========================
   GET USER BY ID
========================= */
export const getUserById = async (id) => {
  const result = await sql`
    SELECT id, full_name, email, contact, address, role, created_at
    FROM users
    WHERE id = ${id}
  `;

  return result[0];
};

export const getUserWithOrders = async (id) => {
  const result = await sql`
    SELECT 
  u.id,
  u.full_name,
  u.email,
  u.contact,
  u.address,
  u.role,
  u.created_at,

  COALESCE(
    json_agg(
      json_build_object(
        'id', o.id,
        'amount', o.amount,
        'payment_mode', o.payment_mode,
        'order_details', o.order_details,
         'status', o.order_status, 
        'created_at', o.created_at
      )
    ) FILTER (WHERE o.id IS NOT NULL),
    '[]'
  ) AS orders

FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.id = ${id}
GROUP BY u.id;`;

  return result[0];
};
/* =========================
   UPDATE USER
========================= */
export const updateUser = async (id, data) => {
  const { full_name, email, contact, address } = data;

  const result = await sql`
    UPDATE users
    SET
      full_name = ${full_name},
      email = ${email},
      contact = ${contact},
      address = ${address}
    WHERE id = ${id}
    RETURNING id, full_name, email, contact, address
  `;

  return result[0];
};