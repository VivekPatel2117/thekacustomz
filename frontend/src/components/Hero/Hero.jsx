import styles from "./Hero.module.css";

const Hero = ({
  desktopImage,
  mobileImage,
  heading,
  subHeading,
  buttonText,
  buttonLink
}) => {
  return (
    <section className={styles.hero}>
      {/* Responsive Images */}
      <picture>
        <source media="(max-width: 768px)" srcSet={mobileImage} />
        <img
          src={desktopImage}
          alt={heading}
          className={styles.heroImage}
        />
      </picture>

      {/* Overlay Content */}
      <div className={styles.overlay}>
        <h1>{heading}</h1>
        <p>{subHeading}</p>

        {buttonText && (
          <a href={buttonLink} className={styles.ctaButton}>
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;
