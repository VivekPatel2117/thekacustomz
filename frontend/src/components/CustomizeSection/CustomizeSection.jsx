import styles from "./CustomizeSection.module.css";

const CustomizeSection = ({
  image,
  brand,
  heading,
  subHeading,
  steps,
  buttonText,
  buttonLink
}) => {
  return (
    <section className={styles.wrapper}>
      {/* Left Image */}
      <div className={styles.imageCol}>
        <img src={image} alt="Customization" />
      </div>

      {/* Right Content */}
      <div className={styles.contentCol}>
        <span className={styles.brand}>{brand}</span>

        <h2 className={styles.heading}>{heading}</h2>

        <p className={styles.subHeading}>{subHeading}</p>

        <ul className={styles.steps}>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>

        <a href={buttonLink} className={styles.button}>
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export default CustomizeSection;
