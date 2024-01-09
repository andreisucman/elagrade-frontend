import useSWR from "swr";
import { useState } from "react";
import Button from "../Button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PiArrowsClockwise } from "react-icons/pi";
import { GoBlocked } from "react-icons/go";
import { useRouter } from "next/router";
import { checkPaymentStatus } from "../../functions/checkPaymentStatus";
import styles from "./PaymentStatus.module.scss";

type Props = {
  intentId: string | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PaymentStatus({ intentId, setShowModal }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState("p");

  useSWR({ intentId, setStatus }, checkPaymentStatus, {
    refreshInterval: 5000,
  });

  function getContent(status: string) {
    switch (status) {
      case "a":
        return {
          title: "Payment Accepted",
          icon: <IoIosCheckmarkCircle className={styles.icon} />,
          body: "You can start grading now",
        };
      case "p":
        return {
          title: "Checking Your Payment",
          icon: (
            <PiArrowsClockwise className={`${styles.icon} ${styles.rotate}`} />
          ),
          body: "This usually takes less than a minute",
        };
      case "f":
        return {
          title: "Payment Failed",
          icon: <GoBlocked className={styles.icon} />,
          body: "We were unable to confirm your payment",
        };
      default:
        return {
          title: "Checking Your Payment",
          icon: (
            <PiArrowsClockwise className={`${styles.icon} ${styles.rotate}`} />
          ),
          body: "This usually takes less than a minute",
        };
    }
  }

  function handleClose() {
    setShowModal(false);
    router.push({ pathname: "/pricing", query: {} });
  }

  const content = getContent(status);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className="close" onClick={handleClose} />
        <h3 className={styles.title}>{content.title}</h3>
        {content.icon}
        {content.body}
        {status === "a" && (
          <Button
            buttonText="Start grading"
            onClick={() => router.push({ pathname: "/grading", query: {} })}
          />
        )}
      </div>
    </div>
  );
}
