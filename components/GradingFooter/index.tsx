import React from "react";
import Button from "../Button";
import { deleteAllFromIndexedDb } from "@/functions/indexedDb";
import styles from "./GradingFooter.module.scss";

type Props = {
  students: any[];
  handleGrade: () => void;
  gradingResults: any;
  gradingStatus: string | null;
};

const GradingFooter = ({
  students,
  gradingStatus,
  gradingResults,
  handleGrade,
}: Props) => {
  async function handleDownload(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = `class_report_${new Date().getTime().toString()}.docx`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
  }

  return (
    <div className={styles.container}>
      {gradingResults && (
        <div className={styles.buttons}>
          <Button
            buttonText="Download all"
            customStyle={{ width: "100%" }}
            innerStyle={{
              margin: "auto 0 0 auto",
            }}
            onClick={() => handleDownload(gradingResults.assignmentReportUrl)}
          />
          <button
            className={styles.button}
            onClick={async () => {
              await deleteAllFromIndexedDb();
              window.location.reload();
            }}
          >
            Start over
          </button>
        </div>
      )}
      {students.length > 0 && !gradingResults && (
        <Button
          isDisabled={gradingStatus !== null}
          buttonText="Grade"
          customStyle={{ minWidth: "10rem" }}
          innerStyle={{ margin: "auto 0 0 auto" }}
          onClick={handleGrade}
        />
      )}
    </div>
  );
};

export default GradingFooter;
