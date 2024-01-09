import { useEffect } from "react";
import Button from "../Button";
import { BsBattery } from "react-icons/bs";
import { FaRegRectangleList } from "react-icons/fa6";
import { useRouter } from "next/router";
import styles from "./ProblemPopup.module.scss";

type Props = {
  message: string | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProblemPopup({ message, setShowModal }: Props) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleClose() {
    setShowModal(false);
    router.push({ pathname: router.pathname, query: {} });
  }

  function getContent(message: string) {
    let response = {
      title: "Balance too low",
      icon: <BsBattery className={styles.icon} />,
      message: message,
    };

    if (message === "grading criteria missing") {
      response = {
        title: "Missing grading criteria",
        icon: <FaRegRectangleList className={styles.icon} />,
        message: "Please set it and retry",
      };
    }

    return response;
  }

  return (
    <div className={styles.container}>
      {message && (
        <div className={styles.wrapper}>
          <div className="close" onClick={handleClose} />
          {getContent(message).icon}
          <h3 className={styles.title}>{getContent(message).title}</h3>
          <p>{getContent(message).message}</p>
          {message !== "grading criteria missing" && (
            <Button
              buttonText="Top up"
              onClick={() => router.push({ pathname: "/pricing", query: {} })}
            />
          )}
        </div>
      )}
    </div>
  );
}
