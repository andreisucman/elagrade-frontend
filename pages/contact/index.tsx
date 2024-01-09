import React from "react";
import Button from "../../components/Button";
import styles from "./Contact.module.scss";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const AboutPage: React.FC = () => {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Contact</h2>
        <p className={styles.paragraph}>
          Learn how to ease your life as a mother with our books! Equip yourself
          with proven baby care strategies, family relationships insights,
          self-care organization tips and wisdom shared by thousands of mothers
          and concisely compiled in easy to read books, action notes and todo
          lists.
        </p>
        <p>
          Say goodbye to anxiety, relieve stress and feel fulfilled and happier
          every day!
        </p>
        <p>And if you need to reach us you can always send an email here:</p>
        <p className={styles.email}>info@teachersgradingassistant.com</p>
        <Button
          buttonText={"Check the bundles"}
          onClick={() => (window.location.href = "/bundles")}
          customStyle={{ margin: "1rem 0" }}
        />
      </div>
    </main>
  );
};

export default AboutPage;
