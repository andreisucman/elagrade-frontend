import React, { useEffect, useState } from "react";
import Button from "../Button";
import styles from "./Banner.module.scss";

type Props = {
  handleRoute: () => void;
};

const Banner = ({ handleRoute }: Props) => {
  const [containerStyle, setContainerStyle] = useState<any>();

  useEffect(() => {
    setContainerStyle({
      height: "calc(100dvh - 4.625rem)",
    });
  }, []);
  return (
    <div
      className={styles.container}
      style={containerStyle ? containerStyle : {}}
    >
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
          innerStyle={{ fontSize: "1.15rem", margin: "0.5rem 0 0 0" }}
          buttonText="Start grading free"
          onClick={handleRoute}
        />
      </div>
      <div className={styles.brandLine} />
    </div>
  );
};

export default Banner;
