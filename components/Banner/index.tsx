import React from "react";
import styles from "./Banner.module.scss";

const Banner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Helping Teachers Love Grading</h1>
        <h3 className={styles.subtitle}>
          Automatic Grading Platform For ELA Teachers
        </h3>
      </div>
    </div>
  );
};

export default Banner;
