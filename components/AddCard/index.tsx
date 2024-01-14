import React from "react";
import Image from "next/image";
import plus from "../../public/assets/plus.svg";
import face_plus from "../../public/assets/face_plus.svg";
import styles from "./AddCard.module.scss";

type Props = {
  onClick: (e: any) => void;
  isFile?: boolean;
  customStyle?: any;
  innerStyle?: any;
};

const AddCard = ({ onClick, isFile, customStyle, innerStyle }: Props) => {
  return (
    <div
      className={styles.container}
      style={customStyle ? customStyle : {}}
      onClick={onClick}
    >
      <div style={innerStyle ? innerStyle : {}} className={styles.wrapper}>
        <Image
          alt=""
          className={styles.image}
          src={isFile ? plus : face_plus}
          width={isFile ? 30 : 50}
          height={isFile ? 30 : 50}
        />
      </div>
    </div>
  );
};

export default AddCard;
