import React from "react";
import { TiDocumentText } from "react-icons/ti";
import prepareAndDownloadReport from "@/functions/prepareAndDownloadReport";
import EmptyPlaceholder from "../EmptyPlaceholder";
import styles from "./GradingResult.module.scss";

type Props = {
  gradingResults: { _id: string; results: any[] };
  gradingStatus: string | null;
  totalFiles: number;
};

const GradingResult = ({
  gradingStatus,
  gradingResults,
  totalFiles,
}: Props) => {
  function getContent() {
    return {
      text: "Your grading results will be here",
      icon: (
        <TiDocumentText style={{ minWidth: "1.5rem", minHeight: "1.5rem" }} />
      ),
    };
  }

  const content = getContent();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {gradingResults?.results?.length > 0 ? (
          gradingResults?.results?.map((paper, index) => (
            <div key={index} className={styles.row}>
              <p>{paper.studentName}</p>
              <p className={styles.grades}>
                {Object.keys(paper.grades)
                  .map((rubric) => {
                    const value = paper.grades[rubric];
                    const formattedRubric =
                      rubric[0].toUpperCase() + rubric.slice(1);
                    return `${formattedRubric}: ${value}`;
                  })
                  .join(", ")}
              </p>
              <button
                className={styles.download}
                onClick={() =>
                  prepareAndDownloadReport(
                    gradingResults._id,
                    paper.resultId,
                    paper.studentName
                  )
                }
              >
                Download
              </button>
            </div>
          ))
        ) : (
          <EmptyPlaceholder
            icon={content.icon}
            message={content.text}
            innerStyle={{ transform: "unset" }}
            customStyle={{ padding: "1rem" }}
          />
        )}
      </div>
    </div>
  );
};

export default GradingResult;
