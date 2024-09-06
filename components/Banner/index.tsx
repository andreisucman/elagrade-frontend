import React from "react";
import Button from "../Button";
import styles from "./Banner.module.scss";

type Props = {
  handleRoute: () => void;
};

const Banner = ({ handleRoute }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Helping Teachers Love Grading</h1>
        <h2 className={styles.subtitle}>
          Free AI Essay Grader For ELA Teachers
        </h2>
        <Button
          customStyle={{
            width: "100%",
            margin: 0,
          }}
          id={"home_upper_cta"}
          innerStyle={{ fontSize: "1rem", margin: "0.5rem 0 0 0" }}
          buttonText="Start grading free"
          onClick={handleRoute}
        />
      </div>
      <div className={styles.brandLine} />
    </div>
  );
};

export default Banner;
