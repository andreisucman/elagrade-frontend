import React, { useState } from "react";
import { BiNotepad, BiMessageRoundedCheck } from "react-icons/bi";
import Alert from "../Alert";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import styles from "./GradingStyleButton.module.scss";

type Props = {
  withProofGradingType: boolean;
  withProofGrading: boolean;
  selectType: (withProofGradingType: boolean) => void;
};

export default function GradingStyleButton({
  withProofGradingType,
  withProofGrading,
  selectType,
}: Props) {
  const [showExplanation, setShowExplanation] = useState(false);

  const buttonText = withProofGradingType
    ? "Self-check mode"
    : "One-shot mode (default)";
  const buttonIcon = withProofGradingType ? (
    <BiNotepad className={styles.quesitonIcon} />
  ) : (
    <BiMessageRoundedCheck className={styles.quesitonIcon} />
  );
  const explanation = withProofGradingType
    ? "The bot grades the paper using your grading criteria. It is then asked a number of questions to ensure that it didn't miss anything. See the details in the 'Set self-check questions' tab."
    : "The bot grades the paper in one go using your grading criteria only.";

  const isSelected = withProofGradingType === withProofGrading;
  return (
    <button
      className={
        isSelected ? `${styles.button} ${styles.selected}` : styles.button
      }
      onClick={() => selectType(withProofGradingType)}
    >
      {buttonIcon}
      {buttonText}
      <AiOutlineQuestionCircle
        className={styles.quesitonIcon}
        onClick={(e: any) => {
          e.stopPropagation();
          setShowExplanation(true);
        }}
        style={{ marginLeft: "auto", width: "20px", height: "20px" }}
      />
      {showExplanation && (
        <Alert message={explanation} setShowAlert={setShowExplanation} />
      )}
    </button>
  );
}
