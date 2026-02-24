import { sql } from "../db.js";

/**
 * ADD vote (helpful)
 */
export const addReviewVoteService = async ({ review_id, user_id }) => {
  const [vote] = await sql`
    INSERT INTO review_votes (
      review_id,
      user_id,
      vote_type
    )
    VALUES (
      ${review_id},
      ${user_id},
      'helpful'
    )
    ON CONFLICT (review_id, user_id)
    DO NOTHING
    RETURNING *
  `;
  return vote;
};

/**
 * REMOVE vote
 */
export const removeReviewVoteService = async ({ review_id, user_id }) => {
  const [vote] = await sql`
    DELETE FROM review_votes
    WHERE review_id = ${review_id}
      AND user_id = ${user_id}
    RETURNING *
  `;
  return vote;
};

/**
 * COUNT votes for a review
 */
export const countReviewVotesService = async (review_id) => {
  const [{ count }] = await sql`
    SELECT COUNT(*)::int AS count
    FROM review_votes
    WHERE review_id = ${review_id}
  `;
  return count;
};

/**
 * CHECK if user voted
 */
export const hasUserVotedService = async ({ review_id, user_id }) => {
  const [vote] = await sql`
    SELECT 1
    FROM review_votes
    WHERE review_id = ${review_id}
      AND user_id = ${user_id}
  `;
  return !!vote;
};
