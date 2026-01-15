import { useEffect, useState } from "react";
import styles from "./ProductForm.module.css";
import { uploadProductImage } from "../../utils/uploadProductImage";
import { createProductApi } from "../../services/product.api";
import { getCollectionsApi } from "../../services/collection.api";
import CollectionForm from "../CollectionForm/CollectionForm";

export default function ProductForm() {
  const [collections, setCollections] = useState([]);
  const [collectionId, setCollectionId] = useState("");

  const [heroImage, setHeroImage] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    product_name: "",
    product_price: "",
    product_quantity: "",
    discount_rate: "",
    sku: "",
    is_available: true
  });

  const [variations, setVariations] = useState({
    colors: [],
    sizes: []
  });

  const COLOR_OPTIONS = ["Black", "White", "Red", "Blue"];
  const SIZE_OPTIONS = ["S", "M", "L", "XL"];

  const loadCollections = async () => {
    const res = await getCollectionsApi();
    setCollections(res.data);
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleMultiSelect = (e, type) => {
    const values = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setVariations((prev) => ({ ...prev, [type]: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const heroUrl = await uploadProductImage(
        heroImage,
        form.product_name,
        "hero"
      );

      const productImageUrls = await Promise.all(
        [...productImages].map((img) =>
          uploadProductImage(img, form.product_name)
        )
      );

      await createProductApi({
        ...form,
        collection_id: collectionId,
        hero_image: heroUrl,
        product_images: productImageUrls,
        product_variations: JSON.stringify(variations)
      });

      alert("✅ Product created");
    } catch (err) {
      console.error(err);
      alert("❌ Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* COLLECTION CREATION */}
      <CollectionForm onCreated={loadCollections} />

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create Product</h2>

        {/* COLLECTION SELECT */}
        <label>Collection</label>
        <select
          value={collectionId}
          onChange={(e) => setCollectionId(e.target.value)}
          required
        >
          <option value="">Select Collection</option>
          {collections.map((c) => (
            <option key={c.id} value={c.id}>
              {c.collection_name}
            </option>
          ))}
        </select>

        <input name="product_name" placeholder="Product Name" onChange={handleChange} required />
        <input name="product_desc" placeholder="Product Description" onChange={handleChange} required />
        <input name="product_price" type="number" placeholder="Price" onChange={handleChange} required />
        <input name="product_quantity" type="number" placeholder="Quantity" onChange={handleChange} required />
        <input name="discount_rate" type="flot" placeholder="Discount %" onChange={handleChange} />
        <input name="sku" placeholder="SKU" onChange={handleChange} required />

        <label>Colors</label>
        <select multiple onChange={(e) => handleMultiSelect(e, "colors")}>
          {COLOR_OPTIONS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <label>Sizes</label>
        <select multiple onChange={(e) => handleMultiSelect(e, "sizes")}>
          {SIZE_OPTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <label>Hero Image</label>
        <input type="file" onChange={(e) => setHeroImage(e.target.files[0])} required />

        <label>Product Images</label>
        <input type="file" multiple onChange={(e) => setProductImages(e.target.files)} />

        <button disabled={loading}>
          {loading ? "Uploading..." : "Create Product"}
        </button>
      </form>
    </>
  );
}
