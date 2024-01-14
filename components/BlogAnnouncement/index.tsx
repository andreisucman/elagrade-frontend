import React, { useState, useEffect, useRef } from "react";
import { IoTimeOutline } from "react-icons/io5";
import styles from "./BlogAnnouncement.module.scss";

const BlogAnnouncement = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const header = document.querySelector("header"); // or use a specific class or ID
    if (header) {
      setHeaderHeight(header.offsetHeight);
      headerRef!.current = header;
    }
  }, []);

  const handleScroll = () => {
    if (headerRef.current) {
      const currentScrollPos = window.scrollY;
      setIsSticky(currentScrollPos > headerHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerHeight]);

  const combinedStyles = {
    position: isSticky ? "fixed" : "static",
    top: isSticky ? "0px" : undefined,
  };

  return (
    <div
      onClick={() => (window.location.href = "/")}
      style={combinedStyles as any}
      className={styles.container}
    >
      <IoTimeOutline style={{ width: "1.25rem", height: "1.25rem" }} />
      Save time lost to grading
    </div>
  );
};

export default BlogAnnouncement;
