import React from "react";
import styles from "./RadioGroup.module.scss";

type Props = {
  textIsChecked: string;
  textIsNotChecked: string;
  isChecked: boolean;
  setIsChecked?: (result: boolean) => void;
  customStyles?: React.CSSProperties;
};

export default function RadioGroup({
  textIsChecked,
  textIsNotChecked,
  isChecked,
  setIsChecked,
  customStyles,
}: Props) {
  return (
    <div className={styles.container} style={customStyles}>
      <label className={styles.label}>
        <input
          type="radio"
          checked={!isChecked}
          value="subsectionFeedback"
          onChange={() => (setIsChecked ? setIsChecked(false) : () => {})}
        />
        {textIsNotChecked}
      </label>
      <label className={styles.label}>
        <input
          type="radio"
          checked={isChecked}
          value="wholeFeedback"
          onChange={() => (setIsChecked ? setIsChecked(true) : () => {})}
        />
        {textIsChecked}
      </label>
    </div>
  );
}
