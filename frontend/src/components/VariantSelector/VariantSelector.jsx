import React, { useMemo } from "react";
import styles from "./VariantSelector.module.css";

const VariantSelector = ({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
}) => {
  const variations = useMemo(() => {
    try {
      return JSON.parse(product.product_variations || "{}");
    } catch {
      return {};
    }
  }, [product.product_variations]);

  const hasColors =
    variations.colors &&
    typeof variations.colors === "object" &&
    Object.keys(variations.colors).length > 0;

  const hasSizes =
    Array.isArray(variations.sizes) && variations.sizes.length > 0;

  // ----------------------------
  // CASE 1: COLORS + SIZES
  // ----------------------------
  if (hasColors) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.label}>Color</p>

        <div className={styles.colorRow}>
          {Object.keys(variations.colors).map((color) => (
            <button
              key={color}
              className={`${styles.colorBtn} ${
                selectedColor === color ? styles.active : ""
              }`}
              onClick={() => {
                setSelectedColor(color);
                setSelectedSize(null); // reset size when color changes
              }}
            >
              {color}
            </button>
          ))}
        </div>

        {selectedColor && (
          <>
            <p className={styles.label}>Size</p>
            <div className={styles.sizeRow}>
              {variations.colors[selectedColor].map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeBtn} ${
                    selectedSize === size ? styles.active : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // ----------------------------
  // CASE 2: ONLY SIZES
  // ----------------------------
  if (hasSizes) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.label}>Size</p>
        <div className={styles.sizeRow}>
          {variations.sizes.map((size) => (
            <button
              key={size}
              className={`${styles.sizeBtn} ${
                selectedSize === size ? styles.active : ""
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------
  // CASE 3: No variations
  // ----------------------------
  return null;
};

export default VariantSelector;