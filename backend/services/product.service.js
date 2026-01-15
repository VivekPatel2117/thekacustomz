import sql from "../config/db.js";

/* ---------------- CREATE PRODUCT ---------------- */
export const createProductService = async (payload) => {
  const {
    product_name,
    product_price,
    product_desc,
    product_quantity,
    discount_rate,
    sku,
    is_available,
    collection_id,          // ✅ ADDED
    hero_image,
    product_images,
    product_variations
  } = payload;

  const imagesObject = {
    hero_image,
    product_images
  };

  const [product] = await sql`
    INSERT INTO products (
      product_name,
      product_price,
      product_desc,
      product_quantity,
      discount_rate,
      sku,
      is_available,
      collection_id,
      product_images,
      product_variations
    )
    VALUES (
      ${product_name},
      ${product_price},
      ${product_desc},
      ${product_quantity},
      ${discount_rate},
      ${sku},
      ${is_available},
      ${collection_id},
      ${JSON.stringify(imagesObject)},
      ${product_variations}
    )
    RETURNING *
  `;

  return product;
};

/* ---------------- GET ALL PRODUCTS (WITH COLLECTION) ---------------- */
export const getProductsService = async () => {
  return await sql`
    SELECT 
      p.*,
      c.collection_name,
      c.collection_desc,
      c.collection_image
    FROM products p
    LEFT JOIN collection c ON c.id = p.collection_id
    ORDER BY p.created_at DESC
  `;
};

export const getProductsByTagsService = async (tag) => {
  return await sql`
    SELECT *
    FROM products
    WHERE tags=${tag}
    ORDER BY created_at DESC
  `;
};

/* ---------------- GET PRODUCT BY ID ---------------- */
export const getProductByIdService = async (id) => {
  const [product] = await sql`
    SELECT 
      p.*,
      c.collection_name,
      c.collection_desc,
      c.collection_image
    FROM products p
    LEFT JOIN collection c ON c.id = p.collection_id
    WHERE p.id = ${id}
  `;
  return product;
};

/* ---------------- UPDATE PRODUCT ---------------- */
export const updateProductService = async (id, payload) => {
  const {
    product_name,
    product_price,
    product_quantity,
    discount_rate,
    sku,
    is_available,
    collection_id,        // ✅ ADDED
    hero_image,
    product_images,
    product_variations
  } = payload;

  const imagesObject = {
    hero_image,
    product_images
  };

  const [product] = await sql`
    UPDATE products
    SET
      product_name = ${product_name},
      product_price = ${product_price},
      product_quantity = ${product_quantity},
      discount_rate = ${discount_rate},
      sku = ${sku},
      is_available = ${is_available},
      collection_id = ${collection_id},
      product_images = ${JSON.stringify(imagesObject)},
      product_variations = ${product_variations}
    WHERE id = ${id}
    RETURNING *
  `;

  return product;
};

/* ---------------- DELETE PRODUCT ---------------- */
export const deleteProductService = async (id) => {
  await sql`
    DELETE FROM products
    WHERE id = ${id}
  `;
  return true;
};
