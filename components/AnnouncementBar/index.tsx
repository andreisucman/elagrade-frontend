import React from "react";
import styles from "./AnnouncementBar.module.scss";

type Props = {
  message: string;
  onClick: () => any;
  icon: any;
};

const AnnouncementBar = ({ icon, message, onClick }: Props) => {
  return (
    <div onClick={onClick} className={styles.container}>
      {icon} {message}
    </div>
  );
};

export default AnnouncementBar;
