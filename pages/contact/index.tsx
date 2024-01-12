import React from "react";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./Contact.module.scss";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const AboutPage: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Contact</h2>
          <p className={styles.paragraph}>
            Reclaim your time for self-care, family, health, and professional
            development. Say goodbye to anxiety, relieve stress and feel
            fulfilled and happier every day!
          </p>

          <p>And if you need to reach us you can always send an email here:</p>
          <p className={styles.email}>info@elagrade.com</p>
          <p>or call this number:</p>
          <p className={styles.email}>+1 323 540 57 18</p>
          <Button
            buttonText={"Start grading now"}
            onClick={() => router.push("/grading")}
            customStyle={{ margin: "1rem 0" }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
