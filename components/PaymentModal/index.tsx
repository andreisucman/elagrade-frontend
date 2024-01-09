import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Loading from "../Loading";
import styles from "./PaymentModal.module.scss";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

type Props = {
  orderData: any;
  isLoading: boolean;
  clientSecret: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PaymentModal({
  clientSecret,
  orderData,
  setShowCheckout,
  isLoading,
  setIsLoading,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const appearance = {
    theme: "stripe" as "stripe",

    variables: {
      colorPrimary: "#04a8b7",
      colorText: "#023a4c",
      fontFamily: "Open-Sans, sans-serif",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className="close" onClick={() => setShowCheckout(false)} />
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm
                setIsLoading={setIsLoading}
                clientSecret={clientSecret}
                orderData={orderData}
              />
            </Elements>
          )}
          {isLoading && (
            <Loading
              customStyle={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-75%)",
                zIndex: "3",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
