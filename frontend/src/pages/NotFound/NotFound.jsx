import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.code}>404</h1>
          <h2 className={styles.title}>Page Not Found</h2>
          <p className={styles.description}>
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <div className={styles.buttons}>
            <button
              className={styles.primaryBtn}
              onClick={() => navigate("/")}
            >
              Go To Home
            </button>

            <button
              className={styles.secondaryBtn}
              onClick={() => navigate("/collections")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}