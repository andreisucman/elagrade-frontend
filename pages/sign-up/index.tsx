import React from "react";
import Head from "next/head";
import AuthScreen from "../../components/AuthScreen";
import styles from "./sign-up.module.scss";

const SignUpPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Sign Up | Elagrade</title>
        <meta name="description" content={"Elagrade - Sign Up Page"} />
      </Head>
      <div className={styles.container}>
        <AuthScreen isSignIn={false} />
      </div>
    </>
  );
};

export default SignUpPage;
