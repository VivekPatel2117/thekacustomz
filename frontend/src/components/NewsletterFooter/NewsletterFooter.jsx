import styles from "./NewsletterFooter.module.css";

const NewsletterFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Left Content */}
        <div className={styles.text}>
          <h3>Join our email list</h3>
          <p>Get exclusive deals and early access to new products.</p>
        </div>

        {/* Right Form */}
        <form
          className={styles.form}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Email address"
            required
          />
          <button type="submit" aria-label="Subscribe">
            →
          </button>
        </form>
      </div>
    </footer>
  );
};

export default NewsletterFooter;
