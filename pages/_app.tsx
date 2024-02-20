import React, { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import GeneralContextProvider from "@/state/GeneralContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./global-env.d.ts";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "pageview",
        page: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Layout>
      <GeneralContextProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </GeneralContextProvider>
    </Layout>
  );
}

export default MyApp;
