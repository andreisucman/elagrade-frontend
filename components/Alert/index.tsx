import React, { useRef, useEffect } from "react";
import useHandleClickOutside from "../../functions/useHandleClickOutside";
import styles from "./Alert.module.scss";

type props = {
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  customStyles?: any;
  innerStyles?: any;
  msgStyles?: any;
  onClickText?: string;
  onClick?: (email: any) => Promise<void>;
  onClose?: () => void;
};

export default function Alert({
  setShowAlert,
  message,
  innerStyles,
  customStyles,
  msgStyles,
  onClickText,
  onClose,
  onClick,
}: props) {
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useHandleClickOutside({
    ref: modalRef,
    setIsOpen: setShowAlert ? setShowAlert : onClose,
  });

  return (
    <div className={styles.container} style={customStyles && customStyles}>
      <div
        className={styles.wrapper}
        style={innerStyles && innerStyles}
        ref={modalRef}
      >
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
        {onClickText && (
          <p
            onClick={onClick}
            className={styles.onClickText}
            style={msgStyles && msgStyles}
          >
            {onClickText}
          </p>
        )}
      </div>
    </div>
  );
}
