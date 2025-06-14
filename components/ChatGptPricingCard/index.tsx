import React, { useState } from "react";
import Button from "../Button";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import styles from "./ChatGptPricingCard.module.scss";

const ChatGptPricingCard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={styles.accordionItem}>
      <div
        className={styles.accordionQuestion}
        onClick={() => setIsOpen((prev) => !prev)}
        id={"pricing_have_chat_gpt_plus_plan"}
      >
        <p className={styles.accordionItemTitle}>Have ChatGPT Plus Plan?</p>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <div className={styles.accordionAnswer}>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <p className={styles.about}>
                If you have ChatGPT <b>Plus</b> plan you can use the Elagrade
                App free.
              </p>
              <p className={styles.about_desc}>
                (ChatGPT Plus is a $20 / month subscription offered by OpenAI)
              </p>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <IoIosCheckmarkCircle className={styles.icon} />
                  Unlimited quota
                </li>
                <li className={styles.item}>
                  <IoIosCheckmarkCircle className={styles.icon} />
                  No retyping instructions
                </li>
                <li className={styles.item}>
                  <RxCross2 className={styles.icon} />
                  Consistent formatting
                </li>
                <li className={styles.item}>
                  <RxCross2 className={styles.icon} />
                  No bulk grading
                </li>
                <li className={styles.item}>
                  <RxCross2 className={styles.icon} />
                  No class reports
                </li>
              </ul>
              <Button
                buttonText="Try it out"
                onClick={() =>
                  (window.location.href =
                    "https://chat.openai.com/g/g-e1s0iBTaq-elagrade-teacher-s-grading-assistant")
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGptPricingCard;
