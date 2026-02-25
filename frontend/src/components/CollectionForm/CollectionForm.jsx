import { useState } from "react";
import styles from "./CollectionForm.module.css";
import { uploadProductImage } from "../../utils/uploadProductImage";
import { createCollectionApi } from "../../services/collection.api";
import { useNavigate } from "react-router-dom";
export default function CollectionForm({ onCreated }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    collection_name: "",
    collection_desc: ""
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadProductImage(
        image,
        form.collection_name,
        "collection"
      );

      await createCollectionApi({
        ...form,
        collection_image: imageUrl
      });

      alert("✅ Collection created successfully");

      // Reset form
      setForm({
        collection_name: "",
        collection_desc: ""
      });
      setImage(null);

      // Reload collections in parent
      onCreated?.();

    } catch (err) {
      console.error(err);
      alert("❌ Failed to create collection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Create Collection</h3>
      <div>
          <span className={styles.navigateLink} onClick={() => navigate("/ADMIN")}>Dashboard</span>
          {" | "}
      <span className={styles.navigateLink} onClick={() => navigate("/create-product")}>Create Product</span>
      </div>

      {/* Collection Name */}
      <label>Collection Name</label>
      <input
        name="collection_name"
        value={form.collection_name}
        onChange={handleChange}
        required
      />

      {/* Description */}
      <label>Description</label>
      <textarea
        name="collection_desc"
        value={form.collection_desc}
        onChange={handleChange}
        placeholder="Optional description..."
      />

      {/* Image Upload */}
      <label>Collection Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />

      {/* Image Preview */}
      {image && (
        <div style={{ marginTop: "8px" }}>
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{
              width: "160px",
              borderRadius: "12px",
              objectFit: "cover",
              border: "1px solid #eee"
            }}
          />
        </div>
      )}

      {/* Submit */}
      <button disabled={loading}>
        {loading ? "Creating..." : "Create Collection"}
      </button>
    </form>
  );
}