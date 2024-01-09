import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegFilePdf } from "react-icons/fa";
import styles from "./FileCard.module.scss";

interface FileCardProps {
  file: File;
  onRemoveFile: (file: File) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, onRemoveFile }) => {
  const [imageUrl, setImageUrl] = useState("");

  const createImageUrl = (file: File) => {
    const url = URL.createObjectURL(file);

    setImageUrl(url);

    return () => URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (file.type.includes("image")) {
      const cleanup = createImageUrl(file);
      return cleanup;
    }
  }, [file]);

  const renderFile = () => {
    if (file.type.includes("image")) {
      return (
        <div className={styles.wrapper}>
          <Image
            src={imageUrl || "/"}
            alt={file.name}
            width={30}
            height={30}
            className={styles.image}
          />
          <p className={styles.paragraph}>{file.name}</p>
          <div
            className="close"
            style={{ position: "static", justifySelf: "center" }}
            onClick={() => onRemoveFile(file)}
          />
        </div>
      );
    } else if (file.type.includes("pdf")) {
      return (
        <div className={styles.wrapper}>
          <FaRegFilePdf className={styles.icon} width={30} height={30} />
          <p className={styles.paragraph}>{file.name}</p>
          <div
            className="close"
            style={{ position: "static", justifySelf: "center" }}
            onClick={() => onRemoveFile(file)}
          />
        </div>
      );
    }
  };

  return <div className={styles.container}>{renderFile()}</div>;
};

export default FileCard;
