import React from "react";
import styles from "./SideComponent.module.scss";

const SideComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.button}></div>
      <div className={styles.wrapper}>
        <h3>Imagine you had 2 days off every week</h3>
        <p>
          That you could spend on anything you love. All while providing your
          students with a grade the personal feedback - line-by-line.
        </p>
      </div>
    </div>
  );
};

export default SideComponent;
