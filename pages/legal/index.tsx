import { useEffect } from "react";
import Head from "next/head";

const LegalIndex = () => {
  useEffect(() => {
    window.location.href = "/";
  }, []);

  return (
    <>
      <Head>
        <title>Legal | Elagrade</title>
        <meta name="description" content={"Elagrade - Legal Index"} />
      </Head>
    </>
  );
};

export default LegalIndex;
