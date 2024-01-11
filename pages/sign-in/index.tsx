import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthScreen from "../../components/AuthScreen";
import styles from "./sign-in.module.scss";

const SignInPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <AuthScreen isSignIn={true} />
      </div>
      <Footer />
    </>
  );
};

export default SignInPage;
