import React from "react";
import Image from "next/image";
import styles from "./TestimonialCard.module.scss";

type Props = {
  imageSrc?: any;
  imageAlt: string;
  text: string;
  email: string;
  role: string;
};

const TestimonialCard = ({ imageSrc, imageAlt, text, email, role }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.stars}>
          <div className={styles.star} />
          <div className={styles.star} />
          <div className={styles.star} />
          <div className={styles.star} />
          <div className={styles.star} />
        </div>
        <p className={styles.paragraph}>{text}</p>
        <div className={styles.author_div}>
          {imageSrc && (
            <div className={styles.image_wrapper}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                className={styles.image}
                quality={100}
              />
            </div>
          )}
          <div className={styles.info}>
            <p className={styles.email}>{email}</p>
            <p className={styles.role}>{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
