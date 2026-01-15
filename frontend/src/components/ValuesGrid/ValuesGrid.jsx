import styles from "./ValuesGrid.module.css";

const ValuesGrid = ({ items }) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <div key={index} className={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValuesGrid;
