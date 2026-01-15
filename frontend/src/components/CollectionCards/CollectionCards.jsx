import styles from "./CollectionCards.module.css";

const CollectionCards = ({ title, collections }) => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>{title}</h2>

      <div className={styles.cards}>
        {collections.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className={styles.card}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
            />
            <p className={styles.cardTitle}>{item.title}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CollectionCards;
