import React from "react";
import styles from "./SideComponent.module.scss";

const SideComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.button}></div>
      <div className={styles.wrapper}>
        <h3>Imagine there was a person</h3>
      </div>
    </div>
  );
};

export default SideComponent;
