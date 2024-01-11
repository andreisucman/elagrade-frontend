import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./404.module.scss";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const NotFound: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.description}>This page doesn&apos;t exist</h2>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
