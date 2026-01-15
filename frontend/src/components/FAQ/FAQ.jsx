import { useState } from "react";
import styles from "./FAQ.module.css";

const faqData = [
  {
    question: "What is the return policy?",
    answer: (
      <>
        <p>
          We offer easy returns and exchanges on all our standard products.
          If you’re not fully satisfied with your purchase, you can request
          a return or exchange within the eligible return window.
        </p>

        <p>
          <strong>
            However, customized or personalized products are not eligible
            for returns or exchanges.
          </strong>{" "}
          Since these items are made specifically for you, we cannot accept
          them back unless there is a defect or issue caused from our side.
        </p>

        <p>
          If you need assistance with a return or exchange, feel free to
          contact our support team — we’re always here to help!
        </p>
      </>
    )
  },
  {
    question: "Are any purchases final sale?",
    answer:
      "Yes. Items marked as final sale or customized/personalized products cannot be returned or exchanged unless they arrive damaged or defective."
  },
  {
    question: "When will I get my order?",
    answer:
      "Orders are typically processed within 2–4 business days. Delivery timelines vary depending on your location and the type of product ordered."
  },
  {
    question: "Where are your products manufactured?",
    answer:
      "All our products are designed and manufactured in India with a strong focus on quality, craftsmanship, and ethical production."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>Frequently asked questions</h2>

      <div className={styles.list}>
        {faqData.map((item, index) => (
          <div key={index} className={styles.item}>
            <button
              className={styles.question}
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
              <span
                className={`${styles.icon} ${
                  activeIndex === index ? styles.open : ""
                }`}
              >
                ▾
              </span>
            </button>

            {activeIndex === index && (
              <div className={styles.answer}>{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
