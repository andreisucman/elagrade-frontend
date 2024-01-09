import React from "react";
import { useRouter } from "next/router";
import styles from "./SocialRow.module.scss";

type SocialRowProps = {
  isSignin: boolean;
  setShowRecoverPassword: React.Dispatch<React.SetStateAction<boolean>>;
  onSocialSignUpClick: () => void;
};

const SocialRow: React.FC<SocialRowProps> = ({
  isSignin,
  onSocialSignUpClick,
  setShowRecoverPassword,
}) => {
  const router = useRouter();
  const containerStyle = isSignin
    ? styles.container
    : `${styles.container} ${styles.container__signup}`;

  function handleRouter() {
    isSignin
      ? router.push({ pathname: "/sign-up", query: router.query })
      : router.push({ pathname: "/sign-in", query: router.query });
  }

  return (
    <div className={containerStyle}>
      <div className={styles.wrapper}>
        {isSignin && (
          <p className={"link"} onClick={() => setShowRecoverPassword(true)}>
            Forgot password?
          </p>
        )}
        <button className={styles.button} onClick={onSocialSignUpClick}>
          <div className="icon icon__google icon_xs" />
          {isSignin ? "Sign in with Google" : "Sign up with Google"}
        </button>
      </div>
      <p onClick={handleRouter} className={styles.link}>
        {isSignin ? "Sign up instead" : "Sign in instead"}
      </p>
    </div>
  );
};

export default SocialRow;
