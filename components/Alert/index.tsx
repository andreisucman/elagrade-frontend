import React, { useRef } from "react";
import useHandleClickOutside from "../../functions/useHandleClickOutside";
import styles from "./Alert.module.scss";

type props = {
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  customStyles?: any;
  msgStyles?: any;
  onClose?: () => void;
};

export default function Alert({
  setShowAlert,
  message,
  customStyles,
  msgStyles,
  onClose,
}: props) {
  const modalRef = useRef(null);

  useHandleClickOutside({
    ref: modalRef,
    setIsOpen: setShowAlert ? setShowAlert : onClose,
  });

  return (
    <div className={styles.container} style={customStyles && customStyles}>
      <div className={styles.wrapper} ref={modalRef}>
        <div
          className="close"
          onClick={
            onClose
              ? onClose
              : setShowAlert
              ? () => setShowAlert(false)
              : () => {}
          }
          style={{ top: "0.75rem", right: "0.75rem", backgroundSize: "75%" }}
        />
        {message && (
          <p className={styles.message} style={msgStyles && msgStyles}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
