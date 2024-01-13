import React from "react";
import Head from "next/head";
import AuthScreen from "../../components/AuthScreen";
import styles from "./sign-in.module.scss";

const SignInPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Sign In | Elagrade</title>
        <meta name="description" content={"Elagrade - Sign In Page"} />
      </Head>
      <div className={styles.container}>
        <AuthScreen isSignIn={true} />
      </div>
    </>
  );
};

export default SignInPage;
