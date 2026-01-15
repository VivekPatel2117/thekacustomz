import styles from "./ProductGrid.module.css";

const ProductGrid = ({ title, viewAllLink, products }) => {
  // limit to 8 products
  const visibleProducts = products.slice(0, 8);

  return (
    <section className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h2>{title}</h2>
        <a href={viewAllLink} className={styles.viewAll}>
          View all
        </a>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {visibleProducts.map((product, index) => (
          <a
            key={index}
            href={product.link}
            className={styles.card}
          >
            <div className={styles.imageWrap}>
              {product.onSale && (
                <span className={styles.sale}>SALE</span>
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

export default ProductGrid;
