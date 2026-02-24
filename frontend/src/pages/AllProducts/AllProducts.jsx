import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./AllProducts.module.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
export const AllProducts = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState([]);
    const getAllProducts = async () => {
        try {
            const response = await api.get("/products");
            const data = response.data.data;
            console.log("All Products: ", data);
            setProductData(data);
        }
            catch (err) {
            console.log(err);
        }
    };
    const handleNavigation = (url) => {
        console.log("Navigating to ", url);
        navigate(url);
    }
    useEffect(() => {
        getAllProducts();
    }, []);
  return (
    <div>
      <Navbar />
        <div className={styles.wrapper}>
            <h1>All Products</h1>
            {productData?.length === 0 ? (
                <p>No prodcuts</p>
            ): (
                <>
                  {productData && (
                          <div className={styles.productsWrapper}>
                            {productData.length === 0 ? (
                              <p>No products found in this collection.</p>
                            ) : (
                              productData.map((product, index) => {
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
                                    onClick={() => handleNavigation(`/products/${product.id}/${product.product_uuid}`)}
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
                </>
            )}
        </div>
      <Footer />
    </div>
  );
};
