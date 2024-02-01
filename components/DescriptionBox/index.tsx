import React from "react";
import styles from "./DescriptionBox.module.scss";

type Props = {
  title?: string;
  placeholder?: string;
  text?: string;
  setText?: React.Dispatch<React.SetStateAction<string>>;
};

const DescriptionBox: React.FC<Props> = ({
  text,
  title,
  placeholder,
  setText,
}) => {
  function handleSetText(e: any) {
    if (e.target.value) {
      if (setText) setText(e.target.value);
    } else {
      if (setText) setText("");
    }
  }

  return (
    <div className={styles.container}>
      {title && <p className={styles.title}>{title}</p>}
      <input
        className={styles.input}
        type={"text"}
        value={text}
        placeholder={placeholder}
        onChange={handleSetText}
        maxLength={1000}
      />
    </div>
  );
};

export default DescriptionBox;
