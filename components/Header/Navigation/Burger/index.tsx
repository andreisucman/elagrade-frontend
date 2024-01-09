import React from "react";
import styles from "./Burger.module.scss";

type props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Burger: React.FC<props> = ({ isOpen, setIsOpen }) => {
  return (
    <section
      className={`${styles.container} ${isOpen ? styles.open : ""}`}
      onClick={() => setIsOpen(true)}
    >
      <div className={`${styles.stick} ${styles.topStick}`} />
      <div className={`${styles.stick} ${styles.middleStick}`} />
      <div className={`${styles.stick} ${styles.bottomStick}`} />
    </section>
  );
};

export default Burger;
