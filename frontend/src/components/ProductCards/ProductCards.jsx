import styles from "./ProductCards.module.css";
import { useNavigate } from "react-router-dom";
const ProductCards = ({ title, viewAllLink, products }) => {
  const isScrollable = products.length > 4;
  const navigate = useNavigate();
  const handleProductNavigation = (url) => {
   window.location.href = url;
  };
 
  return (
    <section className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h2>{title}</h2>
        <a href={viewAllLink} className={styles.viewAll}>
          View all
        </a>
      </div>

      {/* Product Rail */}
      <div
        className={`${styles.products} ${
          isScrollable ? styles.scrollable : ""
        }`}
      >
        {products.map((product, index) => (
          <div
            key={index}
             onClick={()=>handleProductNavigation(product.link)}
            className={styles.card}
          >
            <div className={styles.imageWrapper}>
              {product.discount && (
                <span className={styles.saleBadge}>SALE</span>
              )}

              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
              />
            </div>

            <div className={styles.info}>
              <p className={styles.title}>{product.title}</p>

              <div className={styles.priceRow}>
                <span className={styles.price}>
                  Rs. {product.price}
                </span>

                {product.discount && (
                  <span className={styles.compare}>
                    Rs. {product.discount ? product.price - product.discount : 0}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCards;
