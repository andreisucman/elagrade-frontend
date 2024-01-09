import React from "react";
import Pagination from "../Pagination";
import styles from "./UsageTable.module.scss";

type Props = {
  classesResults: any[];
  pagination: any;
  loadNext: (payload: any) => void;
};

const UsageTable = ({ pagination, classesResults, loadNext }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titles}>
          <b style={{ justifySelf: "start" }}>Date</b>
          <b style={{ justifySelf: "start" }}>Assignment</b>
          <b style={{ justifySelf: "end" }}>Pages</b>
        </div>
        {classesResults?.map((classResult: any, index: number) => {
          const date = new Date(classResult._created_at).toLocaleDateString(
            "en-US",
            { year: "2-digit", month: "short", day: "numeric" }
          );
          const pagesUsed = classResult?.totalPages
            ? classResult?.totalPages?.toFixed(2)
            : 0;
          return (
            <div className={styles.group} key={index}>
              <div className={styles.top_row}>
                <p style={{ justifySelf: "start" }}>{date}</p>
                <p style={{ justifySelf: "start" }}>
                  {classResult.assignmentName}
                </p>
                <p style={{ justifySelf: "end" }}>{pagesUsed}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        perPage={pagination.perPage}
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        onClick={loadNext}
        customStyles={{
          position: "absolute",
          left: "0",
          bottom: "-1rem",
          gap: "0.5rem",
          transform: "translateY(100%)",
        }}
      />
    </div>
  );
};

export default UsageTable;
