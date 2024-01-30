import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { FaRegCopy } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { GeneralContext } from "@/state/GeneralContext";
import styles from "./affiliate.module.scss";

const Affiliate = () => {
  const { userDetails } = useContext(GeneralContext);
  const [isCopied, setIsCopied] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      const tId = setTimeout(() => {
        setIsCopied(false);
        clearTimeout(tId);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const parts = [
    {
      title: "How does it work?",
      html: (
        <>
          <p className={styles.description}>
            Whe someone signs up using your link you'll get 30% of al of their
            future top ups and subscription payments.
          </p>
          <p className={styles.description}>
            So share your link with the people that might be interested in
            grading their papers with AI. The more they use Elagrade, the higher
            will be your earnings.
          </p>
        </>
      ),
    },
    {
      title: "How do you get paid?",
      html: (
        <>
          <p className={styles.description}>
            We pay you via the wire transfer at your request. The minimum amount
            of payment is 5$. We cover all sending fees to the banks located in
            the major western countries (US, CA, UK, AU, EU).
          </p>
          <p className={styles.description}>
            To request a payment, click the "Request payment" button once your
            balance is 5$ or more.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Elagrade - Affiliate portal</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Affiliate</h2>
          <p className={styles.title}>Hi, {userDetails?.email}</p>
          <p className={styles.description}>
            Here is your affiliate link (click to copy):
          </p>
          <div
            className={styles.link_wrapper}
            onClick={() =>
              copyTextToClipboard("https://elagrade.com?ai=AHYJWKSAOBQKSID")
            }
          >
            https://elagrade.com?ai=AHYJWKSAOBQKSID
            {isCopied ? (
              <IoIosCheckmarkCircleOutline className={styles.icon} />
            ) : (
              <FaRegCopy className={styles.icon} />
            )}
          </div>
          {parts.map((part, index) => (
            <div key={index} className={styles.accordionItem}>
              <div
                className={styles.accordionQuestion}
                onClick={() => toggleAccordion(index)}
              >
                <p className={styles.accordionItemTitle}>{part.title}</p>
                <div className={styles.chevronWrapper}>
                  {openAccordion === index ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
              </div>
              {openAccordion === index && (
                <div className={styles.accordionAnswer}>{part.html}</div>
              )}
            </div>
          ))}

          <Button buttonText="Request payment" />
        </div>
      </div>
    </>
  );
};

export default Affiliate;
