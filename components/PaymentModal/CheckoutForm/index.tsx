import React, { useState, useEffect, useContext } from "react";
import { GeneralContext } from "@/state/GeneralContext";
import callTheServer from "../../../functions/callTheServer";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Loading from "../../Loading";
import styles from "./CheckoutForm.module.scss";

type Props = {
  orderData: any;
  clientSecret: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CheckoutForm({
  clientSecret,
  orderData,
  setIsLoading,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [intentId, setIntentId] = useState<string>("");
  const [message, setMessage] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const { userDetails } = useContext(GeneralContext);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    async function handlePayment() {
      if (!stripe) return;
      if (!elements) return;

      const response = await stripe.retrievePaymentIntent(clientSecret);
      if (response?.paymentIntent?.id) {
        setIntentId(response.paymentIntent.id);
      } else if (response.error) {
        setIsButtonLoading(false);
        setMessage(response?.error?.message as string);
      }
    }
    handlePayment();
  }, [stripe]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!stripe) {
      return;
    }

    setIsButtonLoading(true);

    await createOrder({
      intentId,
      orderData: { ...orderData, email },
    });

    const { error } = await stripe.confirmPayment({
      elements: elements!,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_FRONTEND_URL + "/pricing",
      },
    });

    if (error) {
      setIsButtonLoading(false);
      if (error.type === "card_error" || error.type === "validation_error") {
        if (error.message) setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  }

  async function createOrder({
    intentId,
    orderData,
  }: {
    intentId: string;
    orderData: any;
  }) {
    const response = await callTheServer({
      endpoint: "createOrder",
      method: "POST",
      body: { intentId, orderData },
    });

    if (response?.status === 200) {
      return true;
    }
  }

  function handleSaveEmail(e: any) {
    if (e.complete) {
      setEmail(e.value.email);
    }
  }

  function handleShowFields() {
    setShowFields(true);
    setIsLoading(false);
  }

  function getDisplayMessage() {
    if (isPrepaid) {
      if (userDetails?.plan === "yearly") {
        return `$${(PPP * 0.7 * prepaidPages).toFixed(
          2
        )} USD (${prepaidPages} pages)`;
      } else {
        return `$${(PPP * prepaidPages).toFixed(
          2
        )} USD (${prepaidPages} pages)`;
      }
    } else {
      return `$${price} USD (${pages} pages)`;
    }
  }

  const paymentElementOptions = {
    layout: "tabs" as "tabs",
    defaultValues: {
      billingDetails: {
        email,
      },
    },
  };

  const notReady = isButtonLoading || !stripe || !elements;

  const { isPrepaid, price, pages, prepaidPages, PPP } = orderData;

  return (
    <form className={styles.form} id="payment-form" onSubmit={handleSubmit}>
      {showFields && <h3 className={styles.title}>Complete payment</h3>}
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => handleSaveEmail(e)}
        className={styles.auth_el}
      />
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
        onReady={handleShowFields}
      />
      {showFields && (
        <p className={styles.displayMessage}>{getDisplayMessage()}</p>
      )}
      {showFields && (
        <button className={styles.button} disabled={notReady} id="submit">
          {notReady ? (
            <Loading
              innerStyle={{
                width: "27px",
                height: "27px",
                justifySelf: "center",
                color: "#023a4c",
              }}
              customStyle={{ margin: 0 }}
            />
          ) : (
            <>
              <LiaMoneyBillWaveSolid
                style={{ minWidth: "1.5rem", minHeight: "1.5rem" }}
              />
              Pay
            </>
          )}
        </button>
      )}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
