import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { GeneralContext } from "@/state/GeneralContext";
import callTheServer from "@/functions/callTheServer";
import PricingCard from "@/components/PricingCard";
import PaymentStatus from "@/components/PaymentStatus";
import PaymentModal from "../../components/PaymentModal";
import styles from "./pricing.module.scss";

type PriceItem = {
  title: string;
  PPP: number;
  pages: number;
  price: number;
  extra: number;
  isPrepaid: boolean;
  priceId: string;
  subscriptionId?: string;
};

interface Payload {
  priceId: string;
  prepaidPages?: string;
  [key: string]:
    | string
    | string[]
    | number
    | boolean
    | number[]
    | boolean[]
    | undefined;
}

const Results: React.FC = () => {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [orderData, setOrderData] = useState<PriceItem | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [intentId, setintentId] = useState<string | null>(null);
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { userDetails } = useContext(GeneralContext);
  const router = useRouter();

  useEffect(() => {
    const intentId = new URLSearchParams(window.location.search).get(
      "payment_intent"
    );

    if (intentId) {
      setintentId(intentId);
      setShowPaymentStatus(true);
    }
  }, []);

  useEffect(() => {
    callTheServer({ endpoint: "getPricing", method: "GET" }).then(
      async (response: any) => {
        if (response?.status === 200) {
          setPrices(response.message);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query?.priceId) return;
    if (!userDetails) return;

    handleCheckout({
      prepaidPages: router?.query?.prepaidPages as string | null,
      priceId: router?.query?.priceId as string,
    });
  }, [router?.query?.priceId, router?.isReady, userDetails]);

  async function handleCheckout({
    priceId,
    prepaidPages,
  }: {
    priceId: string;
    prepaidPages: string | null;
  }) {
    if (!priceId) {
      router.push({
        pathname: "/sign-in",
      });
      return;
    }

    if (prepaidPages) {
      payPrepaid({ priceId, prepaidPages });
    } else {
      paySubscription({ priceId });
    }
  }

  async function payPrepaid({
    priceId,
    prepaidPages,
  }: {
    priceId: string;
    prepaidPages: string | null;
  }) {
    const payload: Payload = { priceId };
    if (prepaidPages) payload.prepaidPages = prepaidPages;

    if (!userDetails?.email) {
      router.push({
        pathname: "/sign-in",
        query: payload,
      });
      return;
    }

    const response = await callTheServer({
      endpoint: "createPaymentIntent",
      method: "POST",
      body: payload,
    });

    if (response?.status === 200) {
      setClientSecret(response.message);
      setShowCheckout(true);

      const orderData = prices.find((price: any) => price.priceId === priceId);

      if (orderData) {
        setOrderData(Object.assign({}, orderData, { prepaidPages }));
      }

      router.push({ pathname: router.pathname, query: {} });
    }
  }

  async function paySubscription({ priceId }: { priceId: string }) {
    const payload: Payload = { priceId };

    if (!userDetails?.email) {
      router.push({
        pathname: "/sign-in",
        query: payload,
      });
      return;
    }

    const response = await callTheServer({
      endpoint: "createSubscription",
      method: "POST",
      body: payload,
    });

    if (response?.status === 200) {
      const { subscriptionId, clientSecret } = response.message;

      setClientSecret(clientSecret);
      setShowCheckout(true);

      const orderData = prices.find((price: any) => price.priceId === priceId);

      if (orderData) {
        orderData.subscriptionId = subscriptionId;
        setOrderData(orderData);
      }

      router.push({ pathname: router.pathname, query: {} });
    }
  }

  return (
    <main className={styles.container}>
      {showPaymentStatus && (
        <PaymentStatus
          intentId={intentId}
          setShowModal={setShowPaymentStatus}
        />
      )}
      {showCheckout && (
        <PaymentModal
          orderData={orderData}
          isLoading={isLoading}
          clientSecret={clientSecret}
          setShowCheckout={setShowCheckout}
          setIsLoading={setIsLoading}
        />
      )}
      <h2 className={styles.title}>Pricing</h2>
      <div className={styles.wrapper}>
        {prices.map(
          ({ title, PPP, pages, price, extra, isPrepaid, priceId }, index) => {
            const monthlyMonthly =
              userDetails?.plan === "monthly" &&
              title?.toLowerCase() === "monthly";
            const yearlyYearly =
              userDetails?.plan === "yearly" &&
              title?.toLowerCase() === "yearly";
            const yearlyMonthly =
              userDetails?.plan === "yearly" &&
              title?.toLowerCase() === "monthly";

            const freeAndLoggedOut = !priceId && !userDetails?.email;

            let unblockButton = false;

            if (isPrepaid && priceId) {
              unblockButton = true;
            }

            if (freeAndLoggedOut) {
              unblockButton = true;
            }

            if (!monthlyMonthly && !isPrepaid) {
              unblockButton = true;
            }
            if (!yearlyMonthly && !isPrepaid) {
              unblockButton = true;
            }

            const discountedPPP =
              isPrepaid && userDetails?.plan === "yearly" ? PPP * 0.7 : PPP;

            return (
              <React.Fragment key={index}>
                <PricingCard
                  PPP={Number(discountedPPP.toFixed(2))}
                  isUnblocked={unblockButton}
                  title={title}
                  pages={pages}
                  price={price}
                  extra={extra}
                  priceId={priceId}
                  isPrepaid={isPrepaid}
                  buttonText={
                    !priceId
                      ? "Sign up"
                      : isPrepaid
                      ? "Top up"
                      : unblockButton
                      ? "Subscribe"
                      : "Plan active"
                  }
                  handleCheckout={handleCheckout}
                />
              </React.Fragment>
            );
          }
        )}
      </div>
    </main>
  );
};

export default Results;
