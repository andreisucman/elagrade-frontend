import React from "react";
import AuthScreen from "../../components/AuthScreen";
import styles from "./sign-up.module.scss";

const SignUpPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <AuthScreen isSignIn={false} />
    </div>
  );
};

export default SignUpPage;
