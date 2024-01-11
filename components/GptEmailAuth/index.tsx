import React, { useState } from "react";
import { useRouter } from "next/router";
import SocialRow from "./SocialRow";
import InputField from "../AuthScreen/InputField";
import RecoverPassword from "../AuthScreen/RecoverPassword";
import Button from "../Button";
import Alert from "../Alert";
import styles from "./GptEmailAuth.module.scss";
import callTheServer from "@/functions/callTheServer";

type Props = {
  setShowFields: React.Dispatch<React.SetStateAction<boolean>>;
  onGoogleButtonClick: () => void;
};

const GptEmailAuth: React.FC<Props> = ({
  setShowFields,
  onGoogleButtonClick,
}) => {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showRecoverPassword, setShowRecoverPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  async function onEmailAuthClick() {
    if (!router.isReady) return;

    if (isSignIn && (email.length === 0 || password.length === 0)) {
      return setAlertMessage("Email and password can't be empty");
    }

    if (!isSignIn && password !== passwordRepeat) {
      return setAlertMessage("Passwords don't match");
    }

    const response = await callTheServer({
      endpoint: isSignIn ? "gptEmailSignIn" : "gptEmailSignUp",
      method: "POST",
      body: { email, password, state: router?.query?.state },
    });

    if (response?.status === 200) {
      window.location.href = response.message;
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
      {!showRecoverPassword && (
        <div className="close" onClick={() => setShowFields(false)} />
      )}
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
            {isSignIn ? "Sign in with email" : "Sign up with email"}
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

          {!isSignIn && (
            <InputField
              type={"password"}
              placeholder={"Repeat your password"}
              setData={setPasswordRepeat}
            />
          )}

          <Button
            buttonText={isSignIn ? "Sign in" : "Sign up"}
            innerStyle={{ maxWidth: "unset" }}
          />

          <SocialRow
            isSignIn={isSignIn}
            onSocialSignUpClick={onGoogleButtonClick}
            setShowRecoverPassword={setShowRecoverPassword}
            setIsSignIn={setIsSignIn}
          />
        </form>
      )}
    </section>
  );
};

export default GptEmailAuth;
