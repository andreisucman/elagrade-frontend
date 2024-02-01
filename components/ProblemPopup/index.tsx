import { useEffect } from "react";
import Button from "../Button";
import { useRouter } from "next/router";
import styles from "./ProblemPopup.module.scss";

type Props = {
  message: any | null;
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

  return (
    <div className={styles.container}>
      {message && (
        <div className={styles.wrapper}>
          <div className="close" onClick={handleClose} />
          <h3 className={styles.title}>{message?.title}</h3>
          <p>{message?.text}</p>
          {message.title === "Balance too low" && (
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
