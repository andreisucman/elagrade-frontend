import React from "react";
import { useRouter } from "next/router";
import styles from "./SocialRow.module.scss";

type SocialRowProps = {
  isSignIn: boolean;
  setShowRecoverPassword: React.Dispatch<React.SetStateAction<boolean>>;
  onSocialSignUpClick: () => void;
};

const SocialRow: React.FC<SocialRowProps> = ({
  isSignIn,
  onSocialSignUpClick,
  setShowRecoverPassword,
}) => {
  const router = useRouter();
  const containerStyle = isSignIn
    ? styles.container
    : `${styles.container} ${styles.container__signup}`;

  function handleRouter() {
    isSignIn
      ? router.push({ pathname: "/sign-up", query: router.query })
      : router.push({ pathname: "/sign-in", query: router.query });
  }

  const handleAreaClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className={containerStyle} onClick={handleAreaClick}>
      <div className={styles.wrapper}>
        {isSignIn && (
          <p className={"link"} onClick={() => setShowRecoverPassword(true)}>
            Forgot password?
          </p>
        )}
        <div className={styles.button} onClick={onSocialSignUpClick}>
          <div className="icon icon__google icon_xs" />
          {isSignIn ? "Google sign in" : "Google sign up"}
        </div>
      </div>
      <p onClick={handleRouter} className={styles.link}>
        {isSignIn ? "Sign up instead" : "Sign in instead"}
      </p>
    </div>
  );
};

export default SocialRow;
