import React from "react";
import AuthScreen from "../../components/AuthScreen";
import styles from "./sign-in.module.scss";

const SignInPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <AuthScreen isSignIn={true} />
    </div>
  );
};

export default SignInPage;
