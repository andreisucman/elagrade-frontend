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
              "(80 - 100%) - demonstrates thorough understanding of the material read -makes inferences response with a high degree of effectiveness -establishes voice with a high degree of effectiveness -uses proofreading strategies with a high degree of effectiveness -uses sentence craft with a high degree of effectiveness"
            }
          />
          <DescriptionBox
            title={"What do you give the lowest grade to?"}
            text={
              "(50 - 59%) - demonstrates limited understanding of the material read -makes inferences with limited effectiveness -establishes voice with limited effectiveness -uses proofreading strategies with limited effectiveness -uses sentence craft with limited effectiveness"
            }
          />
          <DescriptionBox
            title={"What is the most important for the student to demonstrate?"}
            text={
              "This must be a reflection essay about what the student has learnt in Poetry. It's important that the student clearly articulates what they have learned in Poetry."
            }
          />
          <DescriptionBox
            title={"What is the age of the students? (optional)"}
            text={"Example: 15 y.o. (10th grade)"}
          />
          <RadioGroup isWholeFeedback={false} />
          <DescriptionBox
            title={"What are the evaluation rubrics?"}
            text={"Focus, clarity, logical reasoning."}
          />
        </div>
      </div>
    </div>
  );
};

export default GradingCriteriaExamples;
