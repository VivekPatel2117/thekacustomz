import styles from "./CollectionCards.module.css";
import { useNavigate } from "react-router-dom";
const CollectionCards = ({ title, collections }) => {
  const navigate = useNavigate();
  const handleProductNavigation = (url) => {
   navigate(url);
  };
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>{title}</h2>

      <div className={styles.cards}>
        {collections.map((item, index) => (
          <div
            key={index}
            onClick={()=>handleProductNavigation(`/collection/${item.id}`)}
            className={styles.card}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
            />
            <p className={styles.cardTitle}>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionCards;
