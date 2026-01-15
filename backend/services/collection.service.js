import sql from "../config/db.js";

/* ---------------- CREATE COLLECTION ---------------- */
export const createCollectionService = async (payload) => {
  const {
    collection_name,
    collection_desc,
    collection_image
  } = payload;

  const [collection] = await sql`
    INSERT INTO collection (
      collection_name,
      collection_desc,
      collection_image
    )
    VALUES (
      ${collection_name},
      ${collection_desc},
      ${collection_image}
    )
    RETURNING *
  `;

  return collection;
};

/* ---------------- GET ALL COLLECTIONS ---------------- */
export const getCollectionsService = async () => {
  return await sql`
    SELECT *
    FROM collection
    ORDER BY created_at DESC
  `;
};

/* ---------------- GET COLLECTION BY ID ---------------- */
export const getCollectionByIdService = async (id) => {
  const [collection] = await sql`
    SELECT *
    FROM collection
    WHERE id = ${id}
  `;
  return collection;
};

/* ---------------- UPDATE COLLECTION ---------------- */
export const updateCollectionService = async (id, payload) => {
  const {
    collection_name,
    collection_desc,
    collection_image
  } = payload;

  const [collection] = await sql`
    UPDATE collection
    SET
      collection_name = ${collection_name},
      collection_desc = ${collection_desc},
      collection_image = ${collection_image}
    WHERE id = ${id}
    RETURNING *
  `;

  return collection;
};

/* ---------------- DELETE COLLECTION ---------------- */
export const deleteCollectionService = async (id) => {
  await sql`
    DELETE FROM collection
    WHERE id = ${id}
  `;
  return true;
};
