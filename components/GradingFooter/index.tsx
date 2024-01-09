import React from "react";
import Button from "../Button";
import styles from "./GradingFooter.module.scss";

type Props = {
  students: any[];
  handleGrade: () => void;
  gradingResults: any;
};

const GradingFooter = ({ students, gradingResults, handleGrade }: Props) => {
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
        <Button
          buttonText="Download all"
          customStyle={{ minWidth: "17rem" }}
          innerStyle={{ margin: "auto 0 0 auto", maxWidth: "unset" }}
          onClick={() => handleDownload(gradingResults.classReportUrl)}
        />
      )}
      {students.length > 0 && !gradingResults && (
        <Button
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
