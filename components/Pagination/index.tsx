import React from "react";
import styles from "./Pagination.module.scss";

type Props = {
  perPage: number;
  totalPages: number;
  currentPage: number;
  onClick: (payload: any) => void;
  customStyles?: { [key: string]: string };
};

const Pagination: React.FC<Props> = ({
  perPage,
  totalPages,
  currentPage,
  customStyles,
  onClick,
}) => {
  const generatePageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1);
    }

    if (currentPage >= totalPages - 1) {
      return Array.from({ length: 3 }, (_, i) => totalPages - 2 + i);
    }

    return [
      Number(currentPage) - 1,
      Number(currentPage),
      Number(currentPage) + 1,
    ];
  };

  return (
    <div className={styles.container} style={customStyles ? customStyles : {}}>
      {generatePageNumbers().map((pageNumber) => {
        return (
          <p
            key={pageNumber}
            onClick={() => onClick({ page: pageNumber, perPage })}
            className={
              +pageNumber === +currentPage
                ? `${styles.paragraph} ${styles.active} `
                : `${styles.paragraph}`
            }
          >
            {pageNumber}
          </p>
        );
      })}
    </div>
  );
};

export default Pagination;
