import React, { useState, useEffect, useRef } from "react";
import Loading from "../Loading";
import styles from "./GradingOverlay.module.scss";

const GradingOverlay = () => {
  const containerRef = useRef(null);
  const [countdown, setCountdown] = useState(180);

  useEffect(() => {
    if (countdown > 0) {
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => {
        document.body.style.overflow = "";
        clearTimeout(timer);
      };
    }
  }, [countdown]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.box}>
        <b style={{ fontSize: "1.75rem" }}>Grading</b>{" "}
        <Loading
          innerStyle={{
            marginTop: "0.25rem",
            color: "white",
            width: "5rem",
            height: "5rem",
          }}
        />
        {countdown > 0 ? (
          <p className={styles.paragraphs}>{countdown}s left</p>
        ) : (
          <p className={styles.paragraphs}>Almost done...</p>
        )}
      </div>
    </div>
  );
};

export default GradingOverlay;
