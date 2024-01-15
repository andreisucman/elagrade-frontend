import React from "react";
import EmptyPlaceholder from "../EmptyPlaceholder";
import convertSecondsToMinSec from "@/functions/convertSecondsToMinutes";
import { TiDocumentText } from "react-icons/ti";
import { LuBrainCog } from "react-icons/lu";
import type { UserType } from "@/state/types";
import prepareAndDownloadReport from "@/functions/prepareAndDownloadReport";
import styles from "./GradingResult.module.scss";

type Props = {
  gradingResults: { _id: string; results: any[] };
  gradingStatus: string | null;
  totalFiles: number;
  userDetails: UserType;
};

const GradingResult = ({
  gradingStatus,
  gradingResults,
  userDetails,
  totalFiles,
}: Props) => {
  function getContent() {
    if (gradingStatus) {
      return {
        text: `Your papers are processing and will appear on the results page after about ${convertSecondsToMinSec(
          totalFiles * 12
        )}`,
        icon: <LuBrainCog style={{ minWidth: "2rem", minHeight: "2rem" }} />,
      };
    } else if (userDetails?.inProgress) {
      const { count, _created_at } = userDetails?.inProgress;
      const finishesAt = new Date(_created_at).getTime() + count * 12 * 1000;
      const finishesAtDate = new Date(finishesAt);
      const hours = finishesAtDate.getHours().toString().padStart(2, "0");
      const minutes = finishesAtDate.getMinutes().toString().padStart(2, "0");
      const formattedTime = hours + ":" + minutes;

      return {
        text: `Your papers are processing and should be ready by ${formattedTime} on the Results page`,
        icon: <LuBrainCog style={{ minWidth: "1.5rem", minHeight: "1.5rem" }} />,
      };
    } else {
      return {
        text: "Your grading results will be here",
        icon: (
          <TiDocumentText style={{ minWidth: "1.5rem", minHeight: "1.5rem" }} />
        ),
      };
    }
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
