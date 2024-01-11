import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthScreen from "../../components/AuthScreen";
import styles from "./sign-up.module.scss";

const SignUpPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <AuthScreen isSignIn={false} />
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
