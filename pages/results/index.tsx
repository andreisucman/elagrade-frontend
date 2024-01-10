import React, { useState, useEffect } from "react";
import { TbDownload } from "react-icons/tb";
import callTheServer from "@/functions/callTheServer";
import Pagination from "@/components/Pagination";
import EmptyPlaceholder from "../../components/EmptyPlaceholder";
import { TiDocumentText } from "react-icons/ti";
import prepareAndDownloadReport from "@/functions/prepareAndDownloadReport";
import styles from "./results.module.scss";

type LoadNext = {
  page: number;
  perPage: number;
};

const Results: React.FC = () => {
  const [assignments, setAssignments] = useState<any>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
  });

  useEffect(() => {
    callTheServer({
      endpoint: `getGradingResultsList?page=${pagination.currentPage}&perPage=${pagination.perPage}`,
      method: "GET",
    }).then(async (response: any) => {
      if (response?.status === 200) {
        const { result, pagination } = response?.message;
        setAssignments(result);
        setPagination(pagination);
      }
    });
  }, []);

  function loadNext({ page, perPage }: LoadNext) {
    callTheServer({
      endpoint: `getGradingResultsList?page=${page}&perPage=${perPage}`,
      method: "GET",
    }).then(async (response: any) => {
      if (response?.status === 200) {
        const { result, pagination } = response?.message;
        setAssignments(result);
        setPagination(pagination);
      }
    });
  }

  async function deleteResult(assignmentId: string, resultId: string) {
    const response = await callTheServer({
      endpoint: `deleteGradingResult/${assignmentId}/${resultId}`,
      method: "DELETE",
    });

    if (response?.status === 200) {
      const assignmentIndex = assignments.findIndex(
        (assignment: any) => assignment._id === assignmentId
      );
      if (assignmentIndex === -1) {
        console.error("Assignment not found");
        return;
      }

      const updatedResults: any = assignments[assignmentIndex].results.filter(
        (result: any) => result.resultId !== resultId
      );

      if (updatedResults.length === 0) {
        const newAssignments = assignments.filter(
          (assignment: any, index: number) => index !== assignmentIndex
        );
        setAssignments(newAssignments);
      } else {
        const newAssignments: any = [...assignments];
        newAssignments[assignmentIndex] = {
          ...newAssignments[assignmentIndex],
          results: updatedResults,
        };
        setAssignments(newAssignments);
      }
    } else {
      console.error("Failed to delete result");
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Results</h2>
        <div className={styles.content}>
          {assignments.length > 0 ? (
            assignments.map((assignmentResult: any, index: number) => {
              const date = new Date(
                assignmentResult._created_at
              ).toLocaleDateString("en-US", {
                year: "2-digit",
                month: "short",
                day: "numeric",
              });
              return (
                <div className={styles.group} key={index}>
                  <div className={styles.top_row}>
                    <p>{assignmentResult.assignmentName}</p>
                    <a
                      href={assignmentResult.assignmentReportUrl}
                      className={styles.downloadClass}
                    >
                      Download all
                    </a>
                  </div>
                  {assignmentResult.results.map((paper: any, index: number) => (
                    <div key={index} className={styles.row}>
                      <p>{date}</p>
                      <p>{paper.studentName}</p>
                      <p>{paper.grade}</p>
                      <button
                        className={styles.download}
                        onClick={() =>
                          prepareAndDownloadReport(
                            assignmentResult._id,
                            paper.resultId,
                            paper.studentName
                          )
                        }
                      >
                        <TbDownload className={styles.icon} />
                      </button>
                      <div
                        className="close"
                        style={{ position: "static", justifySelf: "flex-end" }}
                        onClick={() =>
                          deleteResult(assignmentResult?._id, paper.resultId)
                        }
                      />
                    </div>
                  ))}
                </div>
              );
            })
          ) : (
            <EmptyPlaceholder
              icon={
                <TiDocumentText
                  style={{ minWidth: "2.5rem", minHeight: "2.5rem" }}
                />
              }
              message={"Your grading results will be here"}
            />
          )}
        </div>
        {assignments.length > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            perPage={pagination.perPage}
            onClick={loadNext}
          />
        )}
      </div>
    </main>
  );
};

export default Results;
