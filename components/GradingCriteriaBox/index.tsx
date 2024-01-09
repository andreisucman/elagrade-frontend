import React, { useState } from "react";
import GradingCriteriaExamples from "../GradingCriteriaExamples";
import DescriptionBox from "../DescriptionBox";
import RadioGroup from "../RadioGroup";
import Button from "../Button";
import styles from "./GradingCriteriaBox.module.scss";

type Props = {
  title: string;
  highest: string;
  lowest: string;
  important: string;
  gradingSystem: string;
  rubrics: string;
  isWholeFeedback: boolean;
  disableSaveButton: boolean;
  saveCriteria: () => Promise<boolean>;
  setIsWholeFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setHighest: React.Dispatch<React.SetStateAction<string>>;
  setLowest: React.Dispatch<React.SetStateAction<string>>;
  setRubrics: React.Dispatch<React.SetStateAction<string>>;
  setImportant: React.Dispatch<React.SetStateAction<string>>;
  setGradingSystem: React.Dispatch<React.SetStateAction<string>>;
};

const GradingCriteriaBox = ({
  highest,
  lowest,
  rubrics,
  important,
  gradingSystem,
  isWholeFeedback,
  disableSaveButton,
  setHighest,
  setLowest,
  setRubrics,
  setImportant,
  setGradingSystem,
  setIsWholeFeedback,
  saveCriteria,
}: Props) => {
  const [buttonText, setButtonText] = useState<string>("Save");
  const [showGradingCriteriaExamples, setShowGradingCriteriaExamples] =
    useState(false);

  async function handleSaveCriteria() {
    const success = await saveCriteria();

    if (success) {
      setButtonText("Saved");
      const tid = setTimeout(() => {
        setButtonText("Save");
        clearTimeout(tid);
      }, 3000);
    } else {
      setButtonText("Error: please retry");
      const tid = setTimeout(() => {
        setButtonText("Save");
        clearTimeout(tid);
      }, 3000);
    }
  }

  function toggleIsWholeFeedback(result: boolean) {
    setIsWholeFeedback(result);
  }

  return (
    <>
      {showGradingCriteriaExamples && (
        <GradingCriteriaExamples
          setShowGradingCriteriaExamples={setShowGradingCriteriaExamples}
        />
      )}

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.gradingTitleSecondary}>
            <p
              className={styles.gradingTitleOption}
              onClick={() => setShowGradingCriteriaExamples((prev) => !prev)}
            >
              See criteria examples
            </p>
          </div>
          <DescriptionBox
            title={"What do you give the highest grade to?"}
            text={highest}
            placeholder={
              "Example: To a paper that contains no grammatical errors, has a logical structure with introduction, body, and conclusion, proper citations, and demonstration of critical reasoning"
            }
            setText={setHighest}
          />
          <DescriptionBox
            title={"What do you give the lowest grade to?"}
            text={lowest}
            placeholder={
              "Example: To a paper that contains multiple grammatical errors, lacks citations, has off-topic text, and demonstrates lack of preparation"
            }
            setText={setLowest}
          />
          <DescriptionBox
            title={"What is the most important for the student to demonstrate?"}
            text={important}
            placeholder={
              "Example: The student must demonstrate that they have done their research and structured their paper logically"
            }
            setText={setImportant}
          />
          <DescriptionBox
            title={"What grading system you use?"}
            text={gradingSystem}
            placeholder={"Example: A-F Letter Grading System"}
            setText={setGradingSystem}
          />
          <RadioGroup
            isWholeFeedback={isWholeFeedback}
            toggleIsWholeFeedback={toggleIsWholeFeedback}
          />
          {!isWholeFeedback && (
            <DescriptionBox
              title={"What are the feedback rubrics?"}
              text={rubrics}
              placeholder={"Example: Focus, clarity, grammar, etc..."}
              setText={setRubrics}
            />
          )}
          <Button
            buttonText={buttonText}
            isDisabled={disableSaveButton}
            innerStyle={{
              margin: "auto 0 0 auto",
              backgroundColor: "transparent",
              color: "#023a4c",
              border: "1px solid #023a4c",
            }}
            onClick={handleSaveCriteria}
          />
        </div>
      </div>
    </>
  );
};

export default GradingCriteriaBox;
