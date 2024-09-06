import React from "react";
import styles from "./Button.module.scss";

type Props = {
  upperText?: string | null;
  innerStyle?: any;
  customStyle?: any;
  buttonText: string;
  isDisabled?: boolean;
  customClass?: string;
  id?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const Button = ({
  upperText,
  buttonText,
  customStyle,
  customClass,
  innerStyle,
  isDisabled,
  icon,
  id,
  onClick,
}: Props) => {
  function handleClick() {
    if (onClick) onClick();
  }
  return (
    <div
      style={customStyle ? customStyle : {}}
      className={
        customClass ? `${styles.container} ${customClass}` : styles.container
      }
    >
      {upperText && <p className={styles.upper}>{upperText}</p>}
      <button
        id={id}
        className={
          isDisabled ? `${styles.button} ${styles.disabled}` : styles.button
        }
        disabled={isDisabled}
        style={innerStyle ? innerStyle : {}}
        onClick={handleClick}
      >
        {icon && icon} {buttonText}
      </button>
    </div>
  );
};

export default Button;
