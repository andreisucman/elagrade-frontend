import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import FileCard from "../FileCard";
import AddCard from "../AddCard";
import styles from "./StudentCard.module.scss";

type Props = {
  student: any;
  index: number;
  onRemoveStudentCard: (student: any) => void;
  onAddStudentFiles: (studentId: string, newFiles: File[]) => void;
  onRemoveStudentFile: (studentId: string, fileName: string) => void;
};

const StudentCard = ({
  index,
  student,
  onRemoveStudentCard,
  onAddStudentFiles,
  onRemoveStudentFile,
}: Props) => {
  // Initialize with accepted file types
  const [acceptedFileType, setAcceptedFileType] = useState<string[]>([
    "image/jpg",
    "image/jpeg",
    "image/png",
    "application/msword",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
  ]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFileType.reduce(
      (acc, type) => ({ ...acc, [type]: [] }),
      {}
    ),
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const firstFileType = acceptedFiles[0].type;
        if (!acceptedFileType.includes(firstFileType)) {
          setAcceptedFileType([firstFileType]);
        }
      }

      if (student.files.length < 20) {
        onAddStudentFiles(student.id, acceptedFiles);
      }
    },
  });

  useEffect(() => {
    // Reset to default file types when the component is unmounted
    return () =>
      setAcceptedFileType([
        "image/jpg",
        "image/jpeg",
        "image/png",
        "application/msword",
        "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
      ]);
  }, []);

  const handleFileAreaClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.container}>
      <div
        className="close"
        onClick={() => onRemoveStudentCard(student)}
        style={{ right: "0.75rem" }}
      />
      <div className={styles.wrapper} {...getRootProps()}>
        <AddCard
          customStyle={{
            minHeight: "3rem",
          }}
          onClick={() => {}}
          isFile={true}
        />
        <input {...getInputProps()} />
        <div className={styles.filesArea} onClick={handleFileAreaClick}>
          {student.files.map((file: any, index: number) => (
            <React.Fragment key={index}>
              <FileCard
                file={file}
                onRemoveFile={() => onRemoveStudentFile(student.id, file.name)}
              />
            </React.Fragment>
          ))}
        </div>
        {student.files.length === 0 && (
          <div className={styles.paragraph}>
            Drop one assignment here (images, PDF, Doc, TXT)
            <i>(of a single student)</i>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
