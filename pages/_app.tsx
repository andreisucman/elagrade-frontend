import React, { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import fav from "../public/fav.svg";
import Layout from "../components/Layout";
import GeneralContextProvider from "@/state/GeneralContext";
import Hotjar from "@hotjar/browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./global-env.d.ts";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const siteId = 3805467;
    const hotjarVersion = 6;

    Hotjar.init(siteId, hotjarVersion);
  }, []);

  return (
    <Layout>
      <GeneralContextProvider>
        <Header />
        <Head>
          <link rel="shortcut icon" href={fav.src} type="image/svg" />
        </Head>
        <Component {...pageProps} />
      </GeneralContextProvider>
      <Footer />
    </Layout>
  );
}

export default MyApp;
