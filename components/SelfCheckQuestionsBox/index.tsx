import React, { useState, useRef, useEffect } from "react";
import GradingCriteriaExamples from "../GradingCriteriaExamples";
import QuestionBox from "../QuestionBox";
import Button from "../Button";
import callTheServer from "@/functions/callTheServer";
import AddCard from "../AddCard";
import Alert from "../Alert";
import styles from "./SelfCheckQuestionsBox.module.scss";
import { v4 } from "uuid";

type Question = { id: string; question: string };

const defaultQuestions = [
  {
    id: v4(),
    question: `Does this paper deserve the highest grade according to the grading criteria? Why?`,
  },
  {
    id: v4(),
    question: `Does this paper deserve the lowest grade according to the grading criteria? Why?`,
  },
  {
    id: v4(),
    question: `Did the student demonstrate what is important based on the grading criteria? Why?`,
  },
  {
    id: v4(),
    question: `Which paragraphs are the most satisfactory based on the grading criteria? Why?`,
  },
  {
    id: v4(),
    question: `Which paragraphs are the least satisfactory based on the grading criteria? Why?`,
  },
  {
    id: v4(),
    question: `What are the areas that the student should improve on based on the grading criteria?`,
  },
  {
    id: v4(),
    question: `What makes you think that this grade is appropriate or not?`,
  },
];

const explanation =
  "Self-check questions make the AI check its work, catch omissions, and analyze topics more deeply. Good self-check questions are open-ended and neutral in their intent. This means asking without implying and requesting an explanation of the thought process. An example of a bad self-check question is: 'Are you sure that this is an appropriate grade?'. An example of a good self-check question is 'What makes you think that this grade is appropriate or not?'. Asking the latter question makes the AI go over the paper again with a clear objective in mind, which results in a deeper comprehension. You can ask up to 10 self-check questions. Each question is given to the AI in a row after the initial assessment. In the end, the AI reanalyzes its initial verdict based on the information gathered through the self-check process.";

const SelfCheckQuestionsBox = () => {
  const [buttonText, setButtonText] = useState<string>("Save");
  const [showGradingCriteriaExamples, setShowGradingCriteriaExamples] =
    useState(false);
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const [fieldsSnapshot, setFieldsSnapshot] = useState(defaultQuestions);
  const [showAlert, setShowAlert] = useState(false);

  const disableSaveQuestions = useRef(true);
  disableSaveQuestions.current =
    JSON.stringify(questions.map((q) => q.question)).trim() ===
    JSON.stringify(fieldsSnapshot.map((q) => q.question)).trim();

  useEffect(() => {
    callTheServer({ endpoint: "getProofGradingQuestions", method: "GET" }).then(
      (response) => {
        if (response?.status === 200) {
          if (response.message) {
            const isArray = Array.isArray(response.message);
            setQuestions(isArray ? response.message : defaultQuestions);
            setFieldsSnapshot(isArray ? response.message : []);
          } else {
            setFieldsSnapshot(defaultQuestions);
          }
        }
      }
    );
  }, []);

  async function handleSaveQuestions() {
    try {
      const success = await callTheServer({
        endpoint: "rewriteProofGradingQuestions",
        method: "POST",
        body: { questions },
      });

      if (success) {
        setButtonText("Saved");
        setFieldsSnapshot(questions);
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
    } catch (err) {}
  }

  function setDefaults() {
    setQuestions(defaultQuestions);
  }

  function handleOnChange(id: string, value: string) {
    const newQuestions = questions.map((q) =>
      q.id === id ? { ...q, question: value } : q
    );
    setQuestions(newQuestions);
  }

  function handleDelete(id?: string) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  function handleAddNew() {
    setQuestions((prev) => [
      ...prev,
      { id: `${questions.length}`, question: "" },
    ]);
  }

  return (
    <>
      {showGradingCriteriaExamples && (
        <GradingCriteriaExamples
          setShowGradingCriteriaExamples={setShowGradingCriteriaExamples}
        />
      )}

      {showAlert && (
        <Alert
          message={explanation}
          setShowAlert={setShowAlert}
          innerStyles={{ maxWidth: "30rem" }}
        />
      )}

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.gradingTitleSecondary}>
            <p
              className={styles.gradingTitleOption}
              onClick={() => setShowAlert((prev) => !prev)}
            >
              Explanation
            </p>
            <p className={styles.gradingTitleOption} onClick={setDefaults}>
              Set defaults
            </p>
          </div>
          {questions?.map((question) => (
            <QuestionBox
              key={question.id}
              question={question}
              placeholder={
                "Does this paper deserve the highest grade according to the grading criteria? Why?"
              }
              onChange={handleOnChange}
              handleDelete={handleDelete}
            />
          ))}
          {questions.length < 10 && (
            <AddCard
              isFile={true}
              onClick={handleAddNew}
              customStyle={{ minHeight: "50px", borderRadius: "8px" }}
            />
          )}

          <Button
            buttonText={buttonText}
            isDisabled={disableSaveQuestions.current}
            innerStyle={{
              margin: "auto 0 0 auto",
              backgroundColor: "transparent",
              color: "#023a4c",
              border: "1px solid #023a4c",
              maxWidth: "10rem",
            }}
            onClick={handleSaveQuestions}
          />
        </div>
      </div>
    </>
  );
};

export default SelfCheckQuestionsBox;
