import React, { useState, useEffect, useContext, useRef } from "react";
import Head from "next/head";
import { v4 } from "uuid";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GeneralContext } from "@/state/GeneralContext";
import callTheServer from "@/functions/callTheServer";
import GradingHeader from "@/components/GradingHeader";
import GradingCriteriaBox from "@/components/GradingCriteriaBox";
import GradingFooter from "@/components/GradingFooter";
import StudentsArea from "@/components/StudentsArea";
import GradingResult from "@/components/GradingResult";
import { resizeImage } from "@/functions/resizeImage";
import { BsExclamationDiamond } from "react-icons/bs";
import DescriptionBox from "@/components/DescriptionBox";
import GradingOverlay from "@/components/GradingOverlay";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProblemPopup from "@/components/ProblemPopup";
import Alert from "@/components/Alert";
import styles from "./grading.module.scss";

const Grading = () => {
  const [students, setStudents] = useState<any>([]);
  const [highest, setHighest] = useState("");
  const [lowest, setLowest] = useState("");
  const [rubrics, setRubrics] = useState("");
  const [important, setImportant] = useState("");
  const [fieldsSnapshot, setFieldsSnapshot] = useState("");
  const [gradingResults, setGradingResults] = useState<any>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [assignmentName, setAssignmentName] = useState("");
  const [problemPopupMessage, setProblemPopupMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [resendEmailText, setResendEmailText] = useState(
    "(Click to resend the email)"
  );
  const [announcementBarClass, setAnnouncementBarClass] = useState("hidden");
  const { userDetails, setUserDetails, isLoading } = useContext(GeneralContext);

  const [isWholeFeedback, setIsWholeFeedback] = useState(false);
  const [gradingStatus, setGradingStatus] = useState<string | null>(null);
  const [showGradingOverlay, setShowGradingOverlay] = useState<boolean>(false);

  const disableSavingCriteria = useRef(true);
  disableSavingCriteria.current =
    (isWholeFeedback
      ? highest + lowest + important + isWholeFeedback
      : highest + lowest + important + isWholeFeedback + rubrics) ===
    fieldsSnapshot;

  const studentsExist = useRef(false);
  studentsExist.current = students.length > 0 ? true : false;

  const totalFilesRef = useRef(0);
  totalFilesRef.current = students
    .map((student: any) => student.files)
    .flat().length;

  useEffect(() => {
    callTheServer({ endpoint: "getGradingCriteria", method: "GET" }).then(
      async (response: any) => {
        if (response?.status === 200) {
          const { highest, lowest, important, isWholeFeedback, rubrics } =
            response.message;
          setHighest(highest);
          setLowest(lowest);
          setImportant(important);
          setIsWholeFeedback(isWholeFeedback);
          setRubrics(rubrics);

          const criteria = isWholeFeedback
            ? highest + lowest + important + isWholeFeedback
            : highest + lowest + important + isWholeFeedback + rubrics;

          setFieldsSnapshot(criteria);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!userDetails?.emailVerified) setAnnouncementBarClass("");
    }
  }, [isLoading]);

  function onAddStudentFiles(studentId: string, newFiles: File[]) {
    setStudents(
      students.map((student: any) => {
        if (student.id === studentId) {
          return {
            ...student,
            files: [...student.files, ...newFiles],
          };
        }

        return student;
      })
    );
  }

  function onRemoveStudentFile(studentId: string, fileName: string) {
    return setStudents(
      students.map((student: any) => {
        if (student.id === studentId) {
          const updatedFiles = student.files.filter(
            (file: File) => file.name !== fileName
          );
          return {
            ...student,
            files: updatedFiles,
          };
        }
        return student;
      })
    );
  }

  function onAddStudentCard() {
    setStudents((students: any[]) => [
      ...students,
      { name: `Student ${students.length + 1}`, id: v4(), files: [] },
    ]);
  }

  function onRemoveStudentCard(studentToRemove: any) {
    setGradingResults(null);

    const newStudents = students.filter(
      (student: any) => student.id !== studentToRemove.id
    );
    setStudents(newStudents);
  }

  async function saveCriteria() {
    const payload = {
      jsonCriteria: {
        highest,
        lowest,
        important,
        rubrics: isWholeFeedback ? "" : rubrics,
        isWholeFeedback,
      },
    };

    const response = await callTheServer({
      endpoint: "rewriteGradingCriteria",
      method: "PUT",
      body: payload,
    });

    if (response?.status === 200) {
      const criteria = isWholeFeedback
        ? highest + lowest + important + isWholeFeedback
        : highest + lowest + important + isWholeFeedback + rubrics;
      setFieldsSnapshot(criteria);

      return true;
    }

    return false;
  }

  async function handleGrade() {
    if (!userDetails?.emailVerified)
      return setAlertMessage(
        `We've sent a verification email to ${
          userDetails?.email ? userDetails.email : "your email"
        }. Please confirm it.`
      );

    setShowGradingOverlay(true);
    setGradingStatus("preparing");
    const allFileBatches = students.map((student: any) => student.files);
    const allUrls = [];

    for (let fileGroup of allFileBatches) {
      const formData = new FormData();
      for (const file of fileGroup) {
        let isImage = file.type.includes("image");

        if (isImage) {
          const url = URL.createObjectURL(file);
          const resizedImageUrl = await resizeImage({ url, maxSize: 1200 });
          const response = await fetch(resizedImageUrl);
          const blob = await response.blob();
          formData.append("files", blob, file.name);
        } else {
          formData.append("files", file, file.name);
        }
      }

      const response = await callTheServer({
        endpoint: "uploadToSpaces",
        method: "POST",
        body: formData,
      });

      if (response?.status === 200) {
        allUrls.push(response.message);
      }
    }

    const payload = allUrls.map((batch) =>
      batch.map((url: string) => {
        let mimeType;
        if (
          url.includes(".jpg") ||
          url.includes(".jpeg") ||
          url.includes(".png")
        ) {
          mimeType = "image";
        } else if (url.includes(".pdf")) {
          mimeType = "pdf";
        } else if (url.includes(".doc") || url.includes(".docx")) {
          mimeType = "doc";
        } else if (url.includes(".txt")) {
          mimeType = "txt";
        }
        return { type: mimeType, url };
      })
    );

    /* grade if quota is ok */
    setGradingStatus("grading");
    const response = await callTheServer({
      endpoint: "gradePaper",
      method: "POST",
      body: {
        files: payload,
        assignmentName:
          assignmentName !== "" ? assignmentName : "Untitled assignment",
      },
    });

    if (response?.status === 200) {
      setGradingResults(response.message);
      setOpenAccordion(3);
      setUserDetails(
        Object.assign({}, userDetails, {
          pagesLeft: response.message.pagesLeft,
        })
      );
      setGradingStatus(null);
      setShowGradingOverlay(false);
    } else if (response?.status === 400) {
      setProblemPopupMessage(response?.message);

      if (response.message.title === "Grading criteria missing") {
        setOpenAccordion(2);
      }
      setGradingStatus(null);
      setShowGradingOverlay(false);
    }
  }

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  async function resendVerificationEmail() {
    if (resendEmailText !== "(Click to resend the email)") return;

    const response = await callTheServer({
      endpoint: `sendVerificationEmail/${userDetails?.email}`,
      method: "GET",
    });

    if (response?.status === 200) {
      setResendEmailText("Please check your inbox");

      const tId = setTimeout(() => {
        setResendEmailText("(Click to resend the email)");
        setAlertMessage(null);
        clearTimeout(tId);
      }, 4000);
    }
  }

  const parts = [
    {
      title: "Assignment name",
      html: (
        <DescriptionBox
          placeholder={"Example: Essay on the importance of sleeping"}
          text={assignmentName}
          setText={setAssignmentName}
        />
      ),
    },
    {
      title: "Upload papers",
      html: (
        <StudentsArea
          students={students}
          onAddStudentCard={onAddStudentCard}
          onRemoveStudentCard={onRemoveStudentCard}
          onAddStudentFiles={onAddStudentFiles}
          onRemoveStudentFile={onRemoveStudentFile}
        />
      ),
    },
    {
      title: "Set grading criteria",
      html: (
        <GradingCriteriaBox
          title={"Grading criteria"}
          disableSaveButton={disableSavingCriteria.current}
          isWholeFeedback={isWholeFeedback}
          highest={highest}
          rubrics={rubrics}
          lowest={lowest}
          important={important}
          setIsWholeFeedback={setIsWholeFeedback}
          setHighest={setHighest}
          setRubrics={setRubrics}
          setLowest={setLowest}
          setImportant={setImportant}
          saveCriteria={saveCriteria}
        />
      ),
    },
    {
      title: "Grading result",
      html: (
        <GradingResult
          gradingResults={gradingResults}
          totalFiles={totalFilesRef.current}
          gradingStatus={gradingStatus}
        />
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Grading | Elagrade</title>
        <meta name="description" content={"Elagrade - Grading"} />
      </Head>
      <AnnouncementBar
        icon={<BsExclamationDiamond />}
        message="Verify your email"
        customClass={announcementBarClass}
        onClick={() =>
          setAlertMessage(
            `We've sent a verification email to ${
              userDetails?.email ? userDetails.email : "your email"
            }. Please confirm it.`
          )
        }
      />
      {showGradingOverlay && (
        <GradingOverlay
          seconds={totalFilesRef.current * 10}
          gradingStatus={gradingStatus}
          setShowGradingOverlay={setShowGradingOverlay}
        />
      )}

      <div className={styles.container}>
        <div className={styles.wrapper}>
          {alertMessage && (
            <Alert
              message={alertMessage}
              setShowAlert={() => setAlertMessage(null)}
              onClickText={resendEmailText}
              onClick={resendVerificationEmail}
            />
          )}
          {problemPopupMessage && (
            <ProblemPopup
              message={problemPopupMessage}
              setShowModal={() => setProblemPopupMessage(null)}
            />
          )}

          <GradingHeader />
          {parts.map((part: any, index: number) => {
            const showDonwloadAll =
              part.title === "Grading result" &&
              gradingResults?.assignmentReportUrl;
            const showPapersToGrade =
              part.title === "Upload papers" && students.length > 0;

            return (
              <div key={index} className={styles.accordionItem}>
                <div
                  className={styles.accordionQuestion}
                  onClick={() => toggleAccordion(index)}
                >
                  <p className={styles.accordionItemTitle}>
                    {part.title} {showPapersToGrade && `(${students.length})`}
                  </p>
                  <div className={styles.chevronWrapper}>
                    {showDonwloadAll && (
                      <a
                        className={styles.downloadAll}
                        onClick={(event) => event.stopPropagation()}
                        href={gradingResults?.assignmentReportUrl}
                      >
                        Download all
                      </a>
                    )}
                    {openAccordion === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>
                </div>
                {openAccordion === index && (
                  <div className={styles.accordionAnswer}>{part.html}</div>
                )}
              </div>
            );
          })}

          {studentsExist.current && (
            <GradingFooter
              students={students}
              gradingResults={gradingResults}
              handleGrade={handleGrade}
              gradingStatus={gradingStatus}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Grading;
