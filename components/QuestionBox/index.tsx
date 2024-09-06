import React from "react";
import styles from "./QuestionBox.module.scss";

type Props = {
  title?: string;
  placeholder?: string;
  question?: { id: string; question: string };
  onChange?: (id: string, value: string) => void;
  handleDelete: (id?: string) => void;
};

const QuestionBox: React.FC<Props> = ({
  question,
  title,
  placeholder,
  onChange,
  handleDelete,
}) => {
  function handleSetText(e: any, id?: string) {
    if (!id) return;

    if (e.target.value) {
      if (onChange) onChange(id, e.target.value);
    } else {
      if (onChange) onChange(id, "");
    }
  }

  return (
    <div className={styles.container}>
      {title && <p className={styles.title}>{title}</p>}
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          type={"text"}
          value={question?.question}
          placeholder={placeholder}
          onChange={(e) => handleSetText(e, question?.id)}
          maxLength={1000}
        />
        <div
          className="close"
          style={{ position: "static", justifySelf: "center", zIndex: "0" }}
          onClick={() => handleDelete(question?.id)}
        />
      </div>
    </div>
  );
};

export default QuestionBox;
