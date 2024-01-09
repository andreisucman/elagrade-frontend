import React, { useState, useRef } from "react";
import Button from "../Button";
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

  function getExplanation(title: string) {
    switch (title) {
      case "Prepaid":
        return "For teachers who just want to try it. Top up as little as $1 USD.";
      case "Monthly":
        return "For teachers who seek better value. Pay 7 cents per page (500 words).";
      case "Yearly":
        return "For teachers who want the best value. Pay 4 cents per page (500 words)";
    }
  }

  const priceRef = useRef(0);

  priceRef.current = isPrepaid ? Number(totalPages) * PPP : price;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.totalPrice}>${priceRef.current.toFixed(2)} USD</p>
        <p className={styles.totalPages}>
          Pages: {isPrepaid ? totalPages : pages}
        </p>
        <p className={styles.totalPages}>PPP: ${PPP} USD</p>
        <p className={styles.extra}>
          Extra: {isPrepaid ? "\u2500" : `$${extra} USD`}
        </p>
        <p className={styles.explanation}>{getExplanation(title)}</p>
        {isPrepaid && (
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
            {title === "Monthly" ? (
              <span style={{ fontSize: "1.25rem" }}>Better value</span>
            ) : (
              <b style={{ fontSize: "1.25rem" }}>Best value</b>
            )}
          </>
        )}
      </div>
      <Button
        customClass={isUnblocked ? "" : "disabled"}
        buttonText={buttonText}
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
