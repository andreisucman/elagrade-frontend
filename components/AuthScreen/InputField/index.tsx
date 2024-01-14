import React from "react";
import styles from "./InputField.module.scss";

type InputFieldProps = {
  value?: string;
  type: string;
  placeholder: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
};

const InputField: React.FC<InputFieldProps> = ({
  value,
  type,
  placeholder,
  setData,
}) => {
  return (
    <label className={styles.label}>
      <input
        type={type}
        value={value}
        className={styles.input}
        placeholder={placeholder}
        onChange={(e) => setData(e.target.value)}
      />
    </label>
  );
};

export default InputField;
