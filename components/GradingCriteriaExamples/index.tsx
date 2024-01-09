import React, { useEffect, useRef } from "react";
import DescriptionBox from "../DescriptionBox";
import useHandleClickOutside from "@/functions/useHandleClickOutside";
import RadioGroup from "../RadioGroup";
import styles from "./GradingCriteriaExamples.module.scss";

type Props = {
  setShowGradingCriteriaExamples: React.Dispatch<React.SetStateAction<boolean>>;
};

const GradingCriteriaExamples = ({ setShowGradingCriteriaExamples }: Props) => {
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useHandleClickOutside({
    ref: containerRef,
    setIsOpen: setShowGradingCriteriaExamples,
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} ref={containerRef}>
        <div
          className="close"
          onClick={() => setShowGradingCriteriaExamples(false)}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>Grading Criteria Example</h3>
          <DescriptionBox
            title={"What do you give the highest grade to?"}
            text={
              "I give the highest grade to a paper that contains no grammatical errors, has a logical structure with introduction, body, and conclusion, proper citations, and demonstration of critical reasoning"
            }
          />
          <DescriptionBox
            title={"What do you give the lowest grade to?"}
            text={
              "I give the lowest grade to a paper that contains multiple grammatical errors, lacks citations, has off-topic text, and demonstrates lack of preparation"
            }
          />
          <DescriptionBox
            title={"What is the most important for the student to demonstrate?"}
            text={
              "The student must demonstrate that they have done their research and structured their ideas logically"
            }
          />
          <DescriptionBox
            title={"What grading system you use?"}
            text={"A-F Letter Grading System"}
          />
          <RadioGroup isWholeFeedback={false} />
          <DescriptionBox
            title={"What are the feedback rubrics?"}
            text={"Focus, clarity, logical reasoning"}
          />
        </div>
      </div>
    </div>
  );
};

export default GradingCriteriaExamples;
