import React from "react";
import FooterList from "./FooterList";
import {
  PiRedditLogoLight,
  PiFacebookLogo,
  PiPinterestLogo,
} from "react-icons/pi";
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
      {
        href: "/blog",
        title: "Blog",
      },
      {
        href: "/contact",
        title: "Contact",
      },
      {
        href: "/sitemap.xml",
        title: "Sitemap",
      },
    ],
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socials}>
          <a href="https://www.reddit.com/user/elagrade_com" aria-label="Elagrade reddit link">
            <PiRedditLogoLight className={styles.icon} />
          </a>
          <a href="https://www.facebook.com/elagrade" aria-label="Elagrade facebook link">
            <PiFacebookLogo className={styles.icon} />
          </a>
          <a href="https://pinterest.com/elagrade/" aria-label="Elagrade pinterest link">
            <PiPinterestLogo className={styles.icon} />
          </a>
        </div>
        <FooterList data={links} />
        <p className={styles.copyright}>
          &copy; {year} Elagrade. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
