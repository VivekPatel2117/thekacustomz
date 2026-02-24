import  sql from "../config/db.js";

/**
 * CREATE media
 */
export const addReviewMediaService = async ({
  review_id,
  media_type,
  media_url,
  thumbnail_url,
}) => {
  const [media] = await sql`
    INSERT INTO review_media (
      review_id,
      media_type,
      media_url,
      thumbnail_url
    )
    VALUES (
      ${review_id},
      ${media_type},
      ${media_url},
      ${thumbnail_url}
    )
    RETURNING *
  `;
  return media;
};

/**
 * READ media by review
 */
export const getReviewMediaService = async (review_id) => {
  return await sql`
    SELECT *
    FROM review_media
    WHERE review_id = ${review_id}
    ORDER BY created_at ASC
  `;
};

/**
 * UPDATE media
 */
export const updateReviewMediaService = async (
  media_id,
  { media_url, thumbnail_url }
) => {
  const [media] = await sql`
    UPDATE review_media
    SET
      media_url = COALESCE(${media_url}, media_url),
      thumbnail_url = COALESCE(${thumbnail_url}, thumbnail_url)
    WHERE id = ${media_id}
    RETURNING *
  `;
  return media;
};

/**
 * DELETE media
 */
export const deleteReviewMediaService = async (media_id) => {
  const [media] = await sql`
    DELETE FROM review_media
    WHERE id = ${media_id}
    RETURNING *
  `;
  return media;
};
