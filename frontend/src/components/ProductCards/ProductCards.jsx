import styles from "./ProductCards.module.css";

const ProductCards = ({ title, viewAllLink, products }) => {
  const isScrollable = products.length > 4;

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
          <a
            key={index}
            href={product.link}
            className={styles.card}
          >
            <div className={styles.imageWrapper}>
              {product.onSale && (
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

                {product.compareAt && (
                  <span className={styles.compare}>
                    Rs. {product.compareAt}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ProductCards;
