import { useState } from "react";
import styles from "./CollectionForm.module.css";
import { uploadProductImage } from "../../utils/uploadProductImage";
import { createCollectionApi } from "../../services/collection.api";

export default function CollectionForm({ onCreated }) {
  const [form, setForm] = useState({
    collection_name: "",
    collection_desc: ""
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadProductImage(
      image,
      form.collection_name,
      "collection"
    );

    await createCollectionApi({
      ...form,
      collection_image: imageUrl
    });

    alert("✅ Collection created");
    onCreated?.();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Create Collection</h3>

      <input
        name="collection_name"
        placeholder="Collection Name"
        onChange={handleChange}
        required
      />

      <textarea
        name="collection_desc"
        placeholder="Description"
        onChange={handleChange}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />

      <button>Create Collection</button>
    </form>
  );
}
