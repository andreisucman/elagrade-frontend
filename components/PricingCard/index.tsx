import React, { useState, useRef } from "react";
import PricingCardPlaceholder from "../CardPlaceholder";
import Button from "../Button";
import Alert from "../Alert";
import styles from "./PricingCard.module.scss";

type Props = {
  title: string;
  PPP: number;
  pages: number | null;
  extra: number | null;
  isPrepaid: boolean;
  priceId: string;
  price: number;
  isUnblocked: boolean;
  buttonText: string;
  handleCheckout: (payload: any) => void;
};

const PricingCard = ({
  title,
  PPP,
  pages,
  price,
  extra,
  isPrepaid,
  priceId,
  buttonText,
  isUnblocked,
  handleCheckout,
}: Props) => {
  const [totalPages, setTotalPages] = useState("10");
  const [alertMessage, setAlertMessage] = useState<null | string>(null);

  function getExplanation(title: string) {
    switch (title) {
      case "Prepaid":
        return "For teachers looking for total freedom.";
      case "Monthly":
        return "For teachers seeking better value.";
      case "Free":
        return "Get 50 pages free. No credit card required.";
    }
  }

  const priceRef = useRef(0);
  const pagesRef = useRef(0);

  priceRef.current = !priceId
    ? price
    : isPrepaid
    ? Number(totalPages) * PPP
    : price;

  pagesRef.current = !priceId
    ? Number(pages)
    : isPrepaid
    ? Number(totalPages)
    : Number(pages);

  return (
    <div className={styles.container}>
      {alertMessage && (
        <Alert
          message={alertMessage}
          setShowAlert={() => setAlertMessage(null)}
        />
      )}
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.totalPrice}>${priceRef.current.toFixed(2)} USD</p>
        <p className={styles.totalPages}>
          Pages: {pagesRef.current.toFixed(0)}
        </p>
        <p>PPP: ${PPP} USD</p>
        <p className={styles.extra}>
          Extra: {isPrepaid ? "\u2500" : `$${extra} USD`}
        </p>
        <p className={styles.explanation}>{getExplanation(title)}</p>
        {isPrepaid && priceId && (
          <label className={styles.range_label}>
            <input
              onChange={(e) => setTotalPages(e.target.value)}
              type="range"
              step="1"
              max="100"
              min="10"
              defaultValue={"10"}
            />
          </label>
        )}
        {!isPrepaid && (
          <>
            <span style={{ fontSize: "1.25rem" }}>Better value</span>
          </>
        )}
        {!priceId && <span style={{ fontSize: "1.25rem" }}>Free value</span>}
        <div className={styles.calculate}>
          {pagesRef.current} assessments save you 6 min each, amounting to ~
          {((Number(pagesRef.current) * 6) / 60).toFixed(0)} hour(s) in total.
      </div>
      <Button
        customClass={isUnblocked ? "" : "disabled"}
        buttonText={buttonText}
        id={`pricing_${buttonText.toLowerCase().split(" ").join("_")}`}
        innerStyle={
          isUnblocked
            ? { maxWidth: "unset" }
            : { maxWidth: "unset", backgroundColor: "#ced2da" }
        }
        onClick={() =>
          handleCheckout({
            priceId,
            prepaidPages: isPrepaid ? totalPages : null,
          })
        }
      />
    </div>
  );
};

export default PricingCard;
