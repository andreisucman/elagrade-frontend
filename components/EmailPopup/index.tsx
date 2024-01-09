import React, { useState, useRef } from "react";
//@ts-ignore
import { useSpring, animated } from "react-spring";
import Image from "next/image";
import Button from "../Button";
import useHandleClickOutside from "@/functions/useHandleClickOutside";
import styles from "./EmailPopup.module.scss";

type Props = {
  imageSrc: any;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (email: string) => Promise<boolean>;
};

const EmailPopup = ({ imageSrc, setShowPopup, onSubmit }: Props) => {
  const [email, setEmail] = useState("");
  const [showStepTwo, setShowStepTwo] = useState(false);
  const popupRef = useRef(null);

  useHandleClickOutside({ ref: popupRef, setIsOpen: setShowPopup });

  async function handleSubmitForm() {
    const successfullySubmitted = await onSubmit(email);

    if (successfullySubmitted) {
      setShowStepTwo(true);
    }
  }

  function handeClosePopup() {
    setShowStepTwo(false);
    setShowPopup(false);
  }

  const fadeInUp = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 300 },
  });

  return (
    <animated.div className={styles.container} style={fadeInUp}>
      <div className={styles.wrapper} ref={popupRef}>
        <div className={"close"} onClick={handeClosePopup} />
        {showStepTwo ? (
          <div className={styles.step_two}>
            <h3 className={styles.form_title}>Success! Book Sent</h3>
            <p className={styles.paragraph}>Please check your email</p>
          </div>
        ) : (
          <>
            <h2 className={styles.form_title}>Where should we send it?</h2>
            <div className={styles.image_wrapper}>
              <Image className={styles.image} src={imageSrc} alt="alt" />
            </div>
            <div className={styles.form}>
              <input
                className={styles.input}
                placeholder="Enter your email here"
                type="email"
                aria-label="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                buttonText={"Send me the book"}
                onClick={handleSubmitForm}
                innerStyle={{ maxWidth: "unset" }}
              />
            </div>
          </>
        )}
      </div>
    </animated.div>
  );
};

export default EmailPopup;
