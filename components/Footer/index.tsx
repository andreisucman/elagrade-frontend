import React from "react";
import FooterList from "./FooterList";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const links = {
    links: [
      {
        href: "/legal/terms",
        title: "Terms",
      },
      {
        href: "/legal/privacy",
        title: "Privacy",
      },
    ],
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <FooterList data={links} />
        <p className={styles.copyright}>
          &copy; {year} Elagrade. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
