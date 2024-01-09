import React from "react";
import styles from "./RadioGroup.module.scss";

type Props = {
  isWholeFeedback: boolean;
  toggleIsWholeFeedback?: (result: boolean) => void;
  customStyles?: React.CSSProperties;
};

export default function RadioGroup({
  isWholeFeedback,
  toggleIsWholeFeedback,
  customStyles,
}: Props) {
  return (
    <div className={styles.container} style={customStyles}>
      <label className={styles.label}>
        <input
          type="radio"
          checked={isWholeFeedback}
          value="wholeFeedback"
          onChange={() =>
            toggleIsWholeFeedback ? toggleIsWholeFeedback(true) : () => {}
          }
        />
        I give feedback as a whole
      </label>
      <label className={styles.label}>
        <input
          type="radio"
          checked={!isWholeFeedback}
          value="subsectionFeedback"
          onChange={() =>
            toggleIsWholeFeedback ? toggleIsWholeFeedback(false) : () => {}
          }
        />
        I give feedback for each rubric
      </label>
    </div>
  );
}
