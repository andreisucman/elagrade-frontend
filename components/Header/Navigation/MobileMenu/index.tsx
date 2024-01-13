import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useHandleClickOutside from "../../../../functions/useHandleClickOutside";
import styles from "./MobileMenu.module.scss";

type link = {
  id: string;
  href: string;
  title: string;
  isMobile?: boolean;
};

type props = {
  links: link[];
  activePage: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu: React.FC<props> = ({
  links,
  activePage,
  isOpen,
  setIsOpen,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  useHandleClickOutside({ ref: containerRef, setIsOpen });
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, setIsOpen]);

  function markActive(href: string) {
    if (href === activePage) {
      return `${styles.link} ${styles.link_active}`;
    }
  }

  return (
    <section
      className={
        isOpen
          ? `${styles.container} ${styles.container_open}`
          : `${styles.container} ${styles.container_close}`
      }
      ref={containerRef}
    >
      <ul
        className={isOpen ? `${styles.list} ${styles.list_open}` : styles.list}
      >
        {links.map((link: link) => (
          <li
            className={`${styles.link} ${markActive(link.href)}`}
            key={link.id}
            style={link.isMobile ? { fontSize: "0.9rem" } : {}}
          >
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MobileMenu;
