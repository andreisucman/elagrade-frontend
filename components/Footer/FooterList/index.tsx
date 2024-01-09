import React from "react";
import styles from "./FooterList.module.scss";

type link = {
  href: string;
  title: string;
};

type data = {
  links: link[];
};

type props = {
  data: data;
};

const FooterList: React.FC<props> = ({ data }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.links.map((link, i) => (
          <li className={styles.item} key={i}>
            <a className={styles.link} href={link.href}>
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterList;
