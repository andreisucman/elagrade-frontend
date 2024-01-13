import React from "react";
import AddCard from "../AddCard";
import StudentCard from "../StudentCard";
import styles from "./StudentsArea.module.scss";

type Props = {
  students: any;
  onAddStudentCard: () => void;
  onRemoveStudentCard: (studentCard: any) => void;
  onAddStudentFiles: (studentId: string, newFiles: File[]) => void;
  onRemoveStudentFile: (studentId: string, fileName: string) => void;
};

const FilesArea = ({
  students,
  onAddStudentCard,
  onRemoveStudentCard,
  onAddStudentFiles,
  onRemoveStudentFile,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {students.map((student: any, index: number) => (
          <React.Fragment key={index}>
            <StudentCard
              index={index}
              student={student}
              onRemoveStudentCard={onRemoveStudentCard}
              onAddStudentFiles={onAddStudentFiles}
              onRemoveStudentFile={onRemoveStudentFile}
            />
          </React.Fragment>
        ))}
        <AddCard onClick={onAddStudentCard} />
      </div>
    </div>
  );
};

export default FilesArea;
