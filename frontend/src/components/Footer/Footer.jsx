import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* TOP */}
      <div className={styles.top}>
        <div className={styles.left}>
          <h3>Join our email list</h3>
          <p>Get exclusive deals and early access to new products.</p>
        </div>

        <div className={styles.right}>
          <input
            type="email"
            placeholder="Email address"
            className={styles.input}
          />
          <button className={styles.submit}>→</button>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <span>© 2026 ThekaCustomz</span>

        <div className={styles.links}>
          <a href="/privacy-policy">Privacy policy</a>
          <a href="/refund-policy">Refund policy</a>
          <a href="/terms-of-service">Terms of service</a>
          <a href="/contact">Contact information</a>
          <a href="/shipping-policy">Shipping policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
