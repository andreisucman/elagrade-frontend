import React, { useContext } from "react";
import { GeneralContext } from "@/state/GeneralContext";
import { useRouter } from "next/router";
import styles from "./GradingHeader.module.scss";

const GradingHeader = () => {
  const { userDetails } = useContext(GeneralContext);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Grading</h2>
      <p className={styles.left} onClick={() => router.push("/pricing")}>
        {userDetails?.pagesLeft?.toFixed(1)} pages
      </p>
    </div>
  );
};

export default GradingHeader;
