import React from "react";
import styles from "./AnnouncementBar.module.scss";

type Props = {
  message: string;
  onClick?: () => any;
  icon: any;
  customClass?: string;
  customStyle?: { [key: string]: string };
};

const AnnouncementBar = ({
  icon,
  message,
  customClass,
  customStyle,
  onClick,
}: Props) => {
  return (
    <div
      onClick={onClick}
      style={customStyle ? customStyle : {}}
      className={
        customClass ? `${styles.container} ${customClass}` : styles.container
      }
    >
      {icon} {message}
    </div>
  );
};

export default AnnouncementBar;
