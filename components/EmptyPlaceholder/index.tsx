import React from "react";
import styles from "./EmptyPlaceholder.module.scss";

type Props = {
  message: string;
  icon: any;
  customStyle?: { [key: string]: string };
  innerStyle?: { [key: string]: string };
};

const EmptyPlaceholder = ({
  message,
  icon,
  innerStyle,
  customStyle,
}: Props) => {
  return (
    <div className={styles.container} style={customStyle ? customStyle : {}}>
      <div className={styles.content} style={innerStyle ? innerStyle : {}}>
        {icon} {message}
      </div>
    </div>
  );
};

export default EmptyPlaceholder;
