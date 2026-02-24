import React, { useState, useEffect } from "react";
import styles from "./ProductDetails.module.css";
import VariantSelector from "../VariantSelector/VariantSelector";
import QuantityCounter from "../QuantityCounter/QuantityCounter";
import { useCartStore } from "../../store/useCartStore";

const ProductDetails = ({ product }) => {
   const addToCart = useCartStore((state) => state.addToCart);
  const imagesData = JSON.parse(product.product_images || "{}");
  const [count, setCount] = useState(1);
  const images = [
    imagesData.hero_image,
    ...(imagesData.product_images || []),
  ].filter(Boolean);

  const [selectedSize, setSelectedSize] = useState(null);
const [selectedColor, setSelectedColor] = useState(null);

   const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.product_name,
      price: product.product_price,
      image: imagesData.hero_image, 
      quantity: count,
      size: selectedSize,
      color: selectedColor, 

    });
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const discountPercent = product.discount_rate
    ? Math.round((product.discount_rate / product.product_price) * 100)
    : null;

  return (
    <div className={styles.container}>
      {/* LEFT: IMAGE CAROUSEL */}
      <div className={styles.imageSection}>
        <div className={styles.mainImageWrapper}>
          <img
            src={images[activeIndex]}
            alt={product.product_name}
            className={styles.mainImage}
          />
        </div>

        {images.length > 1 && (
          <div className={styles.thumbnailRow}>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                className={`${styles.thumbnail} ${
                  activeIndex === index ? styles.active : ""
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: PRODUCT INFO */}
      <div className={styles.detailsSection}>
        <h1 className={styles.title}>{product.product_name}</h1>

        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.product_price}</span>
          {discountPercent && (
            <span className={styles.discount}>SAVE {discountPercent}%</span>
          )}
        </div>

        <p className={styles.stock}>
          {product.is_available ? "In Stock" : "Out of Stock"}
        </p>
          <div>
             <QuantityCounter
        value={count}
        min={1}
        max={10}
        onChange={(val) => setCount(val)}
      />
           <VariantSelector
  product={product}
  selectedSize={selectedSize}
  setSelectedSize={setSelectedSize}
  selectedColor={selectedColor}
  setSelectedColor={setSelectedColor}
/>
          </div>
        <div className={styles.actions}>
          <button onClick={handleAddToCart} className={styles.addToCart}>Add to Cart</button>
          <button className={styles.buyNow}>Buy Now</button>
        </div>

        <div className={styles.description}>
          <h3>Description</h3>
          <p>{product.product_desc}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
