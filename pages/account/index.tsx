import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GeneralContext } from "@/state/GeneralContext";
import Button from "@/components/Button";
import UsageTable from "@/components/UsageTable";
import callTheServer from "@/functions/callTheServer";
import UsageChart from "@/components/UsageChart";
import styles from "./account.module.scss";

type LoadNext = {
  page: number;
  perPage: number;
};

const Results: React.FC = () => {
  const [classesResults, setClassesResults] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
  });
  const { userDetails, setUserDetails, defaultUser } =
    useContext(GeneralContext);
  const router = useRouter();

  useEffect(() => {
    callTheServer({
      endpoint: `getGradingResultsList?page=${pagination.currentPage}&perPage=${pagination.perPage}`,
      method: "GET",
    }).then(async (response: any) => {
      if (response?.status === 200) {
        const { result, pagination } = response.message;
        setClassesResults(result);
        setPagination(pagination);
      }
    });
  }, []);

  async function handleSignOut() {
    const response = await callTheServer({
      endpoint: "signOut",
      method: "GET",
    });

    if (response?.status === 200) {
      if (defaultUser)
        setUserDetails({
          ...defaultUser,
          plan: "prepaid",
          subscriptionId: null,
        });

      router.push("/sign-in");
    }
  }

  async function cancelSubscription() {
    const response = await callTheServer({
      endpoint: `cancelSubscription/${userDetails!.subscriptionId}`,
      method: "DELETE",
    });

    if (response?.status === 200) window.location.reload();
  }

  function loadNext({ page, perPage }: LoadNext) {
    callTheServer({
      endpoint: `getGradingResultsList?page=${page}&perPage=${perPage}`,
      method: "GET",
    }).then(async (response: any) => {
      if (response?.status === 200) {
        const { result, pagination } = response?.message;
        setClassesResults(result);
        setPagination(pagination);
      }
    });
  }

  const pagesLeft = userDetails?.pagesLeft
    ? userDetails!.pagesLeft.toFixed(2)
    : 0;

  return (
    <>
      <Head>
        <title>Account | Elagrade</title>
        <meta name="description" content={"Elagrade - Account page"} />
      </Head>
      <main className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Account</h2>
          <button
            className={styles.signOut}
            onClick={handleSignOut}
            id={"account_sign_out"}
          >
            Sign out
          </button>
        </div>
        <div className={styles.wrapper}>
          <UsageChart data={classesResults} />
          <UsageTable
            classesResults={classesResults}
            pagination={pagination}
            loadNext={loadNext}
          />
          <div className={styles.balance}>
            <p>Your plan is {userDetails?.plan}</p>
            <p>Pages left: {pagesLeft}</p>
            <Button
              buttonText="Top up"
              customStyle={{
                justifySelf: "flex-end",
                maxWidth: "unset",
                width: "100%",
                minWidth: "10rem",
              }}
              id={"account_top_up"}
              innerStyle={{ margin: "0", marginLeft: "auto" }}
              onClick={() => router.push("/pricing")}
            />
            {userDetails?.subscriptionId && (
              <p
                className={styles.cancel}
                onClick={cancelSubscription}
                id={"account_cancel_plan"}
              >
                Cancel plan
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Results;
