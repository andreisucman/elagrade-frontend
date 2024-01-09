import React from "react";
import AuthScreen from "../../components/AuthScreen";
import styles from "./sign-up.module.scss";

const SignUpPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <AuthScreen isSignin={false} />
    </div>
  );
};

export default SignUpPage;
