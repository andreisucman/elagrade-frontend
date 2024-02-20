import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./CardPlaceholder.module.scss";

const CardPlaceholder = ({ viewBox }: { viewBox: any }) => {
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={"100%"}
      viewBox={viewBox}
      backgroundColor="#ffffff"
      foregroundColor="#f1f3f8"
      title=""
      uniqueKey={"uniqueId"}
      id="1"
      className={styles.container}
    >
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
    </ContentLoader>
  );
};

export default CardPlaceholder;
