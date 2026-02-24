import { useState } from "react";
import styles from "./quantity.module.css";

export default function QuantityCounter({
  value = 1,
  min = 1,
  max = 99,
  onChange,
}) {
  const [count, setCount] = useState(value);

  const updateValue = (newValue) => {
    if (newValue < min || newValue > max) return;
    setCount(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => updateValue(count - 1)}
        disabled={count <= min}
      >
        −
      </button>

      <span className={styles.value}>{count}</span>

      <button
        className={styles.button}
        onClick={() => updateValue(count + 1)}
        disabled={count >= max}
      >
        +
      </button>
    </div>
  );
}
