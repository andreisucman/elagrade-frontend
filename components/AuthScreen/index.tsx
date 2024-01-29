import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SocialRow from "./SocialRow";
import InputField from "./InputField";
import { emailAuth } from "../../functions/emailAuth";
import { socialAuth } from "../../functions/socialAuth";
import RecoverPassword from "./RecoverPassword";
import Button from "../Button";
import finalizeOauth from "@/functions/finalizeOauth";
import Alert from "../Alert";
import Link from "next/link";
import styles from "./AuthScreen.module.scss";

type AuthScreenProps = {
  isSignIn: boolean;
};

const AuthScreen: React.FC<AuthScreenProps> = ({ isSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRecoverPassword, setShowRecoverPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [passwordType, setPasswordType] = useState("password");
  const router = useRouter();

  useEffect(() => {
    if (router?.query?.code) {
      finalizeOauth({
        code: router.query.code as string,
        state: router.query.state as string,
      }).then((data) => {
        if (data?.state) {
          router.push(`/pricing?state=${data?.state}`);
        } else {
          router.push("/grading");
        }
      });
    }
  }, [router.asPath, router?.query?.code]);

  async function onEmailAuthClick() {
    if (!router.isReady) return;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail.length === 0 || trimmedPassword.length === 0) {
      return setAlertMessage("Email and password can't be empty");
    }

    const response = await emailAuth({
      isSignIn,
      email: trimmedEmail,
      password: trimmedPassword,
    });

    if (response?.status !== 200) return setAlertMessage(response?.message);

    if (response?.message) {
      if (Object.keys(router.query).length > 0) {
        let queryEntries = Object.entries(router.query).flatMap(
          ([key, value]) => {
            if (Array.isArray(value)) {
              return value.filter((v) => v !== undefined).map((v) => [key, v]);
            } else if (value !== undefined) {
              return [[key, value]];
            }
            return [];
          }
        );

        let queryParams = new URLSearchParams(queryEntries).toString();
        window.location.href = `/pricing?${queryParams}`;
      } else {
        window.location.href = "/grading";
      }
    }
  }

  function onSocialSignUpClick() {
    const queryExists = Object.keys(router.query).length > 0;

    const orderPayload = queryExists ? JSON.stringify(router.query) : null;
    socialAuth(orderPayload);
  }

  function togglePasswordVisibility() {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }

  return (
    <section className={styles.container}>
      {alertMessage && (
        <Alert
          message={alertMessage}
          setShowAlert={() => setAlertMessage(null)}
          customStyles={{ position: "absolute" }}
        />
      )}
      {!showRecoverPassword && <Link className="close" href="/"></Link>}
      {showRecoverPassword ? (
        <RecoverPassword
          email={email}
          setEmail={setEmail}
          setShowRecoverPassword={setShowRecoverPassword}
        />
      ) : (
        <form
          className={styles.wrapper}
          onSubmit={(e) => {
            e.preventDefault();
            onEmailAuthClick();
          }}
        >
          <h2 className={styles.title}>
            {isSignIn ? "Sign in to continue" : "Sign up to continue"}
          </h2>

          <InputField
            type={"email"}
            placeholder={"Enter your email"}
            setData={setEmail}
          />

          <label className={styles.label}>
            <div
              className={
                passwordType === "password"
                  ? `${styles.passwordIcon} icon icon__eye`
                  : `${styles.passwordIcon} icon icon__eye_crossed`
              }
              onClick={togglePasswordVisibility}
            />
            <InputField
              type={passwordType}
              placeholder={"Enter your password"}
              setData={setPassword}
            />
          </label>

          <Button
            buttonText={isSignIn ? "Sign in" : "Sign up"}
            innerStyle={{ maxWidth: "unset" }}
          />

          <SocialRow
            isSignIn={isSignIn}
            onSocialSignUpClick={onSocialSignUpClick}
            setShowRecoverPassword={setShowRecoverPassword}
          />
        </form>
      )}
    </section>
  );
};

export default AuthScreen;
