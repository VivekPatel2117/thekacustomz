import { useState } from "react";
import styles from "./ProductDetail.module.css";

const ProductDetail = ({
  image,
  title,
  price,
  description
}) => {
  const [qty, setQty] = useState(1);

  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const increaseQty = () => {
    setQty(qty + 1);
  };

  return (
    <section className={styles.wrapper}>
      {/* Image */}
      <div className={styles.imageCol}>
        <img src={image} alt={title} />
      </div>

      {/* Details */}
      <div className={styles.detailsCol}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.price}>Rs. {price}</p>

        <div className={styles.divider} />

        {/* Quantity + Add to Cart */}
        <div className={styles.actions}>
          <div className={styles.qty}>
            <button onClick={decreaseQty}>−</button>
            <span>{qty}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          <button className={styles.addToCart}>
            🛒 Add to cart
          </button>
        </div>

        {/* Buy Now */}
        <button className={styles.buyNow}>
          BUY NOW
        </button>

        {/* Description */}
        <div className={styles.description}>
          <h3>Description:</h3>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
