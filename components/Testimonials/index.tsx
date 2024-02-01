import React from "react";
import TestimonialCard from "./TestimonialCard";
import styles from "./Testimonials.module.scss";

type Props = {
  testimonials: any[];
  title?: string;
};

const Testimonials = ({ testimonials, title }: Props) => {
  return (
    <div className={styles.container}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.wrapper}>
        {testimonials.map(({ alt, email, role, text }, i) => (
          <React.Fragment key={i}>
            <TestimonialCard
              imageAlt={alt}
              email={email}
              role={role}
              text={text}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
