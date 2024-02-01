import React, { useState } from "react";
import Link from "next/link";
import callTheServer from "@/functions/callTheServer";
import InputField from "../InputField";
import Button from "@/components/Button";
import styles from "./RecoverPassword.module.scss";

type Props = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setShowRecoverPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const RecoverPassword = ({
  email,
  setEmail,
  setShowRecoverPassword,
}: Props) => {
  const [isSent, setIsSent] = useState(false);

  async function recoverPassword() {
    const response = await callTheServer({
      endpoint: "sendResetPasswordEmail",
      method: "POST",
      body: { email },
    });

    if (response?.status === 200) {
      setIsSent(true);
    }
  }

  return (
    <>
      <div className="close" onClick={() => setShowRecoverPassword(false)} />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {isSent ? (
            <p style={{ paddingRight: "1rem" }}>
              You will get an email if you have an account with us.
            </p>
          ) : (
            <>
              <h3 className={styles.title}>Recover your password</h3>
              <InputField
                type={"text"}
                value={email}
                placeholder="Enter your email here"
                setData={setEmail}
              />
              <Button
                buttonText="Recover password"
                innerStyle={{ maxWidth: "unset" }}
                onClick={recoverPassword}
              />
              <p
                className={styles.return}
                onClick={() => setShowRecoverPassword(false)}
              >
                Return
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RecoverPassword;
