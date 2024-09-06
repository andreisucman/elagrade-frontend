import React, { useContext } from "react";
import { GeneralContext } from "@/state/GeneralContext";
import Head from "next/head";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import styles from "./Contact.module.scss";

const ContactPage: React.FC = () => {
  const { userDetails } = useContext(GeneralContext);
  const router = useRouter();

  function handleRoute() {
    if (userDetails?.email !== "") {
      router.push("/grading");
    } else {
      router.push("/sign-up");
    }
  }

  return (
    <>
      <Head>
        <title>Contact | Elagrade</title>
        <meta name="description" content={"Elagrade - Contact Us"} />
      </Head>
      <main className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Contact</h1>
          <p className={styles.paragraph}>
            Reclaim your time for self-care, family, and personal development.
            Relieve stress and feel happier every day!
          </p>
          <p>And if you need to reach us you can always send an email here:</p>
          <p className={styles.email}>info@elagrade.com</p>
          <p>or call this number:</p>
          <p className={styles.email}>+1 323 540 57 18</p>
          <p style={{ textAlign: "center" }}>
            Purrma LLC, 30N Gould St Ste R Sheridan WY 82801, US
          </p>
          <Button
            buttonText={"Back to grading"}
            onClick={handleRoute}
            customStyle={{ margin: "1rem 0" }}
          />
        </div>
      </main>
    </>
  );
};

export default ContactPage;
