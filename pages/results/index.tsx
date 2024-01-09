import React, { useState, useEffect } from "react";
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
  const [classesResults, setClassesResults] = useState([]);
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
        setClassesResults(result);
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
        setClassesResults(result);
        setPagination(pagination);
      }
    });
  }

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Results</h2>
        <div className={styles.content}>
          {classesResults.length > 0 ? (
            classesResults.map((classResult: any, index: number) => {
              const date = new Date(classResult._created_at).toLocaleDateString(
                "en-US",
                {
                  year: "2-digit",
                  month: "short",
                  day: "numeric",
                }
              );
              return (
                <div className={styles.group} key={index}>
                  <div className={styles.top_row}>
                    <p>{classResult.assignmentName}</p>
                    <a
                      href={classResult.classReportUrl}
                      className={styles.downloadClass}
                    >
                      Download all
                    </a>
                  </div>
                  {classResult.results.map((paper: any, index: number) => (
                    <div key={index} className={styles.row}>
                      <p>{date}</p>
                      <p>{paper.studentName}</p>
                      <p>{paper.grade}</p>
                      <button
                        className={styles.download}
                        onClick={() =>
                          prepareAndDownloadReport(
                            classResult._id,
                            paper.resultId,
                            paper.studentName
                          )
                        }
                      >
                        Download
                      </button>
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
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          perPage={pagination.perPage}
          onClick={loadNext}
        />
      </div>
    </main>
  );
};

export default Results;
