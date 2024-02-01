import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useHandleClickOutside from "@/functions/useHandleClickOutside";
import imagine from "../../public/assets/imagine.svg";
import styles from "./SideComponent.module.scss";

const SideComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useHandleClickOutside({ ref: containerRef, setIsOpen: setIsOpen });

  return (
    <div
      className={
        isOpen ? `${styles.container} ${styles.open}` : styles.container
      }
      ref={containerRef}
    >
      <div
        className={isOpen ? "invisible" : styles.image_wrapper}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image src={imagine} className={styles.image} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>Imagine there is a person</h3>
        <p>
          Who does all of the grading for you so you have 30 more hours each
          month for accomplishing your goals.
        </p>
        <p>Elagrade can be that person. </p>
        <Link className={styles.link} href="/#intro">
          Here's how.
        </Link>
      </div>
    </div>
  );
};

export default SideComponent;
