import { useEffect, useState } from "react";
import styles from "./ProductForm.module.css";
import { uploadProductImage } from "../../utils/uploadProductImage";
import { createProductApi } from "../../services/product.api";
import { getCollectionsApi } from "../../services/collection.api";
import CollectionForm from "../CollectionForm/CollectionForm";
import { useNavigate } from "react-router-dom";
export default function ProductForm() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [collectionId, setCollectionId] = useState("");

  const [heroImage, setHeroImage] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    product_name: "",
    product_desc: "",
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

      alert("✅ Product created successfully");

      // Reset form
      setForm({
        product_name: "",
        product_desc: "",
        product_price: "",
        product_quantity: "",
        discount_rate: "",
        sku: "",
        is_available: true
      });

      setHeroImage(null);
      setProductImages([]);
      setVariations({ colors: [], sizes: [] });
      setCollectionId("");

    } catch (err) {
      console.error(err);
      alert("❌ Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create Product</h2>
        <div>
      <span className={styles.navigateLink} onClick={() => navigate("/ADMIN")}>Dashboard</span>
      {" | "}
        <span className={styles.navigateLink} onClick={()=> navigate("/create-collection")}>Create Collection</span>
        </div>

        {/* Collection */}
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

        {/* Basic Info */}
        <label>Product Name</label>
        <input
          name="product_name"
          value={form.product_name}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="product_desc"
          value={form.product_desc}
          onChange={handleChange}
          required
        />

        {/* Pricing Row */}
        <div className={styles.row}>
          <div>
            <label>Price</label>
            <input
              name="product_price"
              type="number"
              value={form.product_price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Quantity</label>
            <input
              name="product_quantity"
              type="number"
              value={form.product_quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Discount %</label>
            <input
              name="discount_rate"
              type="number"
              value={form.discount_rate}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>SKU</label>
        <input
          name="sku"
          value={form.sku}
          onChange={handleChange}
          required
        />

        {/* Variations */}
        <label>Colors</label>
        <select
          multiple
          value={variations.colors}
          onChange={(e) => handleMultiSelect(e, "colors")}
        >
          {COLOR_OPTIONS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <label>Sizes</label>
        <select
          multiple
          value={variations.sizes}
          onChange={(e) => handleMultiSelect(e, "sizes")}
        >
          {SIZE_OPTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* Hero Image */}
        <label>Hero Image</label>
        <input
          type="file"
          onChange={(e) => setHeroImage(e.target.files[0])}
          required
        />

        {heroImage && (
          <img
            src={URL.createObjectURL(heroImage)}
            alt="preview"
            style={{ width: "120px", borderRadius: "8px" }}
          />
        )}

        {/* Product Images */}
        <label>Product Gallery Images</label>
        <input
          type="file"
          multiple
          onChange={(e) => setProductImages(e.target.files)}
        />

        {productImages.length > 0 && (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[...productImages].map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="preview"
                style={{
                  width: "100px",
                  borderRadius: "8px"
                }}
              />
            ))}
          </div>
        )}

        <button disabled={loading}>
          {loading ? "Uploading..." : "Create Product"}
        </button>
      </form>
    </>
  );
}