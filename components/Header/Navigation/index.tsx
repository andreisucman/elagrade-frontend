import React from "react";
import MobileMenu from "./MobileMenu";
import styles from "./Navigation.module.scss";

type link = {
  id: string;
  href: string;
  title: string;
  isMobile?: boolean;
};

type props = {
  activePage: string;
  links: link[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navigation: React.FC<props> = ({
  links,
  activePage,
  isOpen,
  setIsOpen,
}) => {
  function markActive(href: string) {
    if (href === activePage) {
      return `${styles.link} ${styles.link_active}`;
    }
  }

  return (
    <>
      <div className={styles.container}>
        {!isOpen ? (
          <>
            <ul className={styles.desktop_list}>
              {links
                .filter((l) => !l?.isMobile)
                .map((link: link) => (
                  <li
                    className={`${styles.link} ${markActive(link.href)}`}
                    key={link.id}
                  >
                    <a href={link.href}>{link.title}</a>
                  </li>
                ))}
            </ul>
          </>
        ) : (
          <MobileMenu
            links={links}
            activePage={activePage}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </>
  );
};

export default Navigation;
