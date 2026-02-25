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
      review_text,
      is_anonymous,
      reviewer_name,
      reviewer_email
    )
    VALUES (
      ${product_id},
      ${user_id},
      ${rating},
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
    SELECT 
    pr.*,
    pr.id AS review_id,
    pr.review_text,
    pr.rating,
    rm.thumbnail_url as media_url,
    rv.vote_type
FROM product_reviews pr
LEFT JOIN review_media rm ON pr.id = rm.review_id
LEFT JOIN review_votes rv ON pr.id = rv.review_id
WHERE pr.product_id =${product_id} AND pr.status = 'approved';
  `;
};


export const getAllReviewsService = async () => {
  return await sql`
    SELECT 
    pr.*, 
    p.product_name
FROM product_reviews pr
JOIN products p ON pr.product_id = p.id
WHERE pr.status = 'pending'
ORDER BY pr.created_at DESC;
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

export const updateReviewStatusService = async (review_id, status) => {
  const [review] = await sql`
    UPDATE product_reviews
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${review_id}
    RETURNING *
  `;
  return review;
};
