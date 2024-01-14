import React, { useState, useEffect, useRef } from "react";
import Loading from "../Loading";
import convertSecondsToMinSec from "@/functions/convertSecondsToMinutes";
import styles from "./GradingOverlay.module.scss";

type Props = {
  seconds: number;
  gradingStatus: string | null;
};

const GradingOverlay = ({ seconds, gradingStatus }: Props) => {
  const containerRef = useRef(null);
  const [countdown, setCountdown] = useState(seconds);

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

  function displayContent() {
    if (gradingStatus === "preparing") {
      setCountdown(seconds / 3);
      return (
        <div className={styles.box}>
          <b style={{ fontSize: "1.75rem" }}>Preparing files</b>{" "}
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
      );
    } else if (gradingStatus === "grading") {
      setCountdown(seconds);
      return (
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
            <p className={styles.paragraphs}>
              {convertSecondsToMinSec(countdown)} left
            </p>
          ) : (
            <p className={styles.paragraphs}>Almost done...</p>
          )}
        </div>
      );
    } else if (gradingStatus === "queued") {
      return (
        <div className={styles.box}>
          <b style={{ fontSize: "1.75rem" }}>Grading is in progress</b>
          <p>It will take about {convertSecondsToMinSec(countdown)}</p>
          <p>Visit the results page after this time.</p>
        </div>
      );
    }
  }

  return (
    <div className={styles.container} ref={containerRef}>
      {displayContent()}
    </div>
  );
};

export default GradingOverlay;
