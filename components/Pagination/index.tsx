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

    if (currentPage === 1) {
      return [1, 2, 3];
    }

    if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    if (currentPage === 2) {
      return [1, 2, 3];
    }

    if (currentPage === totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
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
