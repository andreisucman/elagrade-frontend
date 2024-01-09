import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { GeneralContext } from "@/state/GeneralContext";
import Image from "next/image";
import logo from "../../public/logo.svg";
import Burger from "./Navigation/Burger";
import Navigation from "./Navigation";
import Button from "../Button";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const router = useRouter();
  const [activePage, setActivePage] = useState("/");
  const [isOpen, setIsOpen] = useState(false);
  const { userDetails, isLoading } = useContext(GeneralContext);
  const [buttonClass, setButtonClass] = useState("hidden");

  useEffect(() => {
    setActivePage(router.pathname);
  }, [router.asPath, router.pathname]);

  useEffect(() => {
    if (!isLoading) {
      if (userDetails?.email === "") setButtonClass("");
    }
  }, [isLoading, userDetails?.email]);

  const links = [
    {
      id: "0",
      href: "/",
      title: "Home",
    },
    {
      id: "1",
      href: "/grading",
      title: "Grading",
    },
    {
      id: "2",
      href: "/results",
      title: "Results",
    },
    {
      id: "3",
      href: "/pricing",
      title: !isLoading && !userDetails?.email ? "Pricing" : "Top up",
    },
    {
      id: "4",
      href: "/account",
      title: "Account",
    },
    {
      id: "5",
      href: "/legal/terms",
      title: "Terms",
      isMobile: true,
    },
    {
      id: "6",
      href: "/legal/privacy",
      title: "Privacy",
      isMobile: true,
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.rectangle} onClick={() => router.push("/")}>
          <Image
            src={logo.src}
            alt="logo"
            width={logo.width}
            height={logo.height}
            className={styles.logo}
            quality={100}
          />
        </div>
        <div className={styles.nav_wrapper}>
          <Navigation
            activePage={activePage}
            links={links}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Button
            customClass={buttonClass}
            buttonText={"Sign in"}
            customStyle={{
              maxWidth: "8rem",
              width: "100%",
              marginLeft: "1rem",
            }}
            innerStyle={{
              padding: "0.75rem 1rem",

              margin: "0",
              whiteSpace: "nowrap",
            }}
            onClick={() => router.push("/sign-in")}
          />
        </div>
        <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </section>
  );
};

export default Header;
