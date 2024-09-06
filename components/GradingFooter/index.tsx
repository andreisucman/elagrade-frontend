import React from "react";
import Button from "../Button";
import { BiShowAlt } from "react-icons/bi";
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
          <Button
            buttonText="Clear"
            customStyle={{ width: "100%" }}
            innerStyle={{
              backgroundColor: "unset",
              color: "#303030",
              border: "1px solid #303030",
            }}
            onClick={async () => {
              await deleteAllFromIndexedDb();
              window.location.reload();
            }}
          />
        </div>
      )}
      {students.length > 0 && !gradingResults && (
        <Button
          isDisabled={gradingStatus !== null}
          buttonText="Grade"
          icon={<BiShowAlt />}
          customStyle={{ minWidth: "10rem" }}
          innerStyle={{ margin: "auto 0 0 auto" }}
          onClick={handleGrade}
        />
      )}
    </div>
  );
};

export default GradingFooter;
