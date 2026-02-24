import sql  from "../config/db.js";

/**
 * CREATE review
 */
export const createReviewService = async ({
  product_id,
  user_id,
  rating,
  review_title,
  review_text,
  is_anonymous,
  reviewer_name,
  reviewer_email,
}) => {
  const [review] = await sql`
    INSERT INTO product_reviews (
      product_id,
      user_id,
      rating,
      review_title,
      review_text,
      is_anonymous,
      reviewer_name,
      reviewer_email
    )
    VALUES (
      ${product_id},
      ${user_id},
      ${rating},
      ${review_title},
      ${review_text},
      ${is_anonymous},
      ${reviewer_name},
      ${reviewer_email}
    )
    RETURNING *
  `;
  return review;
};

/**
 * READ reviews by product
 */
export const getReviewsByProductService = async (product_id) => {
  return await sql`
    SELECT *
    FROM product_reviews
    WHERE product_id = ${product_id}
      AND status = 'approved'
    ORDER BY created_at DESC
  `;
};

/**
 * READ single review
 */
export const getReviewByIdService = async (review_id) => {
  const [review] = await sql`
    SELECT *
    FROM product_reviews
    WHERE id = ${review_id}
  `;
  return review;
};

/**
 * UPDATE review
 */
export const updateReviewService = async (review_id, updates) => {
  const {
    rating,
    review_title,
    review_text,
  } = updates;

  const [review] = await sql`
    UPDATE product_reviews
    SET
      rating = COALESCE(${rating}, rating),
      review_title = COALESCE(${review_title}, review_title),
      review_text = COALESCE(${review_text}, review_text),
      updated_at = NOW()
    WHERE id = ${review_id}
    RETURNING *
  `;
  return review;
};

/**
 * DELETE review
 */
export const deleteReviewService = async (review_id) => {
  const [review] = await sql`
    DELETE FROM product_reviews
    WHERE id = ${review_id}
    RETURNING *
  `;
  return review;
};
