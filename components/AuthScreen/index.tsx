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
  isSignin: boolean;
};

const AuthScreen: React.FC<AuthScreenProps> = ({ isSignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showRecoverPassword, setShowRecoverPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
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

    if (isSignin && (email.length === 0 || password.length === 0)) {
      return setAlertMessage("Email and password can't be empty");
    }

    if (!isSignin && password !== passwordRepeat) {
      return setAlertMessage("Passwords don't match");
    }

    const message = await emailAuth({ isSignin, email, password });

    if (message) {
      if (Object.keys(router.query).length > 0) {
        // Convert router.query into a format suitable for URLSearchParams, filtering out undefined values
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
    const orderPayload = router.query ? JSON.stringify(router.query) : null;
    socialAuth(orderPayload);
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
            {isSignin ? "Sign in to continue" : "Sign up to continue"}
          </h2>

          <InputField
            type={"email"}
            placeholder={"Enter your email"}
            setData={setEmail}
          />

          <InputField
            type={"password"}
            placeholder={"Enter your password"}
            setData={setPassword}
          />

          {!isSignin && (
            <InputField
              type={"password"}
              placeholder={"Repeat your password"}
              setData={setPasswordRepeat}
            />
          )}

          <Button
            buttonText={isSignin ? "Sign in" : "Sign up"}
            innerStyle={{ maxWidth: "unset" }}
          />

          <SocialRow
            isSignin={isSignin}
            onSocialSignUpClick={onSocialSignUpClick}
            setShowRecoverPassword={setShowRecoverPassword}
          />
        </form>
      )}
    </section>
  );
};

export default AuthScreen;
