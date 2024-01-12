import React, { useState } from "react";
import callTheServer from "@/functions/callTheServer";
import GptEmailAuth from "../../components/GptEmailAuth";
import { MdOutlineMail } from "react-icons/md";
import styles from "./gpt-auth.module.scss";

const GptAuth: React.FC = () => {
  const [showFields, setShowFields] = useState(false);

  function onGoogleButtonClick() {
    callTheServer({ endpoint: "authorizeGoogleGpt", method: "GET" }).then(
      (response) => {
        if (response?.status === 200) {
          window.location.href = response?.message;
        }
      }
    );
  }

  return (
    <div className={styles.container}>
      {showFields ? (
        <GptEmailAuth
          setShowFields={setShowFields}
          onGoogleButtonClick={onGoogleButtonClick}
        />
      ) : (
        <div className={styles.wrapper}>
          <button
            className={`${styles.button} ${styles.email_button}`}
            onClick={() => setShowFields(true)}
          >
            <MdOutlineMail className="icon" />
            Sign in with Email
          </button>
          <button className={styles.button} onClick={onGoogleButtonClick}>
            <div className="icon icon__google icon_xs" />
            Sign in with Google
          </button>
          <p className={styles.explanation}>
            You need to sign in to give the app the ability to store and retrieve your
            grading criteria so you don't have to copy and paste it each time.
          </p>
        </div>
      )}
    </div>
  );
};

export default GptAuth;
