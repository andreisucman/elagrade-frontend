import React from "react";
import { useRouter } from "next/router";
import styles from "./SocialRow.module.scss";

type SocialRowProps = {
  isSignIn: boolean;
  onSocialSignUpClick: () => void;
  setShowRecoverPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const SocialRow: React.FC<SocialRowProps> = ({
  isSignIn,
  setIsSignIn,
  onSocialSignUpClick,
  setShowRecoverPassword,
}) => {
  const router = useRouter();
  const containerStyle = isSignIn
    ? styles.container
    : `${styles.container} ${styles.container__signup}`;

  return (
    <div className={containerStyle}>
      <div className={styles.wrapper}>
        {isSignIn && (
          <p className={"link"} onClick={() => setShowRecoverPassword(true)}>
            Forgot password?
          </p>
        )}
        <button className={styles.button} onClick={onSocialSignUpClick}>
          <div className="icon icon__google icon_xs" />
          {isSignIn ? "Google sign in" : "Google sign up"}
        </button>
      </div>
      <p onClick={() => setIsSignIn((prev) => !prev)} className={styles.link}>
        {isSignIn ? "Sign up instead" : "Sign in instead"}
      </p>
    </div>
  );
};

export default SocialRow;
