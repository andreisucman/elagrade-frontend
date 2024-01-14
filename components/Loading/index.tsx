import React from "react";
import ReactLoading from "react-loading";
import styles from "./Loading.module.scss";

type props = {
  customStyle?: any;
  innerStyle?: any;
  message?: string;
};

const Loading: React.FC<props> = ({ customStyle, innerStyle, message }) => {
  return (
    <div className={styles.container} style={customStyle && customStyle}>
      <div style={innerStyle && innerStyle}>
        <ReactLoading
          type={"bars"}
          color={innerStyle?.color || "#858585"}
          height={innerStyle?.height || 50}
          width={innerStyle?.width || 50}
        />
      </div>
      {message && <span className={styles.msg}>{message}</span>}
    </div>
  );
};

export default Loading;
