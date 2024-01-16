import React from "react";
import { useRouter } from "next/router";
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
  userDetails: any;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navigation: React.FC<props> = ({
  links,
  activePage,
  isOpen,
  userDetails,
  setIsOpen,
}) => {
  const router = useRouter();

  function markActive(href: string) {
    if (href === activePage) {
      return `${styles.link} ${styles.link_active}`;
    }
  }

  function handleRedirect(route: any) {
    if (!router.isReady) return;
    if (route?.protected && userDetails?.email === "") {
      router.push("/sign-in");
    } else {
      router.push(route.href);
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
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRedirect(link)}
                    >
                      {link.title}
                    </span>
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
