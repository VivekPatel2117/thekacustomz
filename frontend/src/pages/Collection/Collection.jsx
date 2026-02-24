import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { getCollectionProductsApi } from "../../services/collection.api";
import styles from "./Collection.module.css";

export const Collection = () => {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const [productData, setProductData] = React.useState(null);

  const getCollectionDetails = async () => {
    try {
      const response = await getCollectionProductsApi(collectionId);
      setProductData(response.data);
      console.log("Collection Products ", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleProductNavigation = (url) => {
    console.log("Navigating to ", url);
    navigate(url);
  };

  useEffect(() => {
    if (collectionId) {
      getCollectionDetails();
    }
  }, [collectionId]); // ✅ added dependency

  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
        <h1>Collection: {productData?.products?.[0]?.collection_name || ""}</h1>

        {productData?.products && (
          <div className={styles.productsWrapper}>
            {productData.products.length === 0 ? (
              <p>No products found in this collection.</p>
            ) : (
              productData.products.map((product, index) => {
                // ✅ SAFE JSON PARSE
                let imagesData = {};
                try {
                  imagesData = JSON.parse(product.product_images || "{}");
                } catch {
                  imagesData = {};
                }

                const heroImage = imagesData.hero_image || "";

                return (
                  <div
                    key={product.id || index}
                    onClick={() => handleProductNavigation(`/products/${product.id}/${product.product_uuid}`)}
                    className={styles.card}
                  >
                    <div className={styles.imageWrapper}>
                      {product.discount && (
                        <span className={styles.saleBadge}>SALE</span>
                      )}

                      <img src={heroImage} alt={product.title} loading="lazy" />
                    </div>

                    <div className={styles.info}>
                      <p className={styles.title}>{product.product_name}</p>

                      <div className={styles.priceRow}>
                        <span className={styles.price}>
                          Rs. {product.product_price}
                        </span>

                        {product.discount && (
                          <span className={styles.compare}>
                            Rs. {product.product_price - product.discount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
