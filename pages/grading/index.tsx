import React, { useState, useEffect, useContext, useRef } from "react";
import Head from "next/head";
import { v4 } from "uuid";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa6";
import { GeneralContext } from "@/state/GeneralContext";
import callTheServer from "@/functions/callTheServer";
import GradingHeader from "@/components/GradingHeader";
import GradingCriteriaBox from "@/components/GradingCriteriaBox";
import GradingFooter from "@/components/GradingFooter";
import StudentsArea from "@/components/StudentsArea";
import SelfCheckQuestionsBox from "@/components/SelfCheckQuestionsBox";
import GradingResult from "@/components/GradingResult";
import { resizeImage } from "@/functions/resizeImage";
import {
  getAllFromIndexedDb,
  deleteFromIndexedDb,
  saveToIndexedDb,
} from "@/functions/indexedDb";
import GradingStyleButton from "@/components/GradingStyleButton";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/functions/localStorage";
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
  const [age, setAge] = useState("");
  const [rubrics, setRubrics] = useState("");
  const [important, setImportant] = useState("");
  const [fieldsSnapshot, setFieldsSnapshot] = useState("");
  const [gradingResults, setGradingResults] = useState<any>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [assignmentName, setAssignmentName] = useState("");
  const [problemPopupMessage, setProblemPopupMessage] = useState<string | null>(
    null
  );
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [resendEmailText, setResendEmailText] = useState("");
  const [announcementBarClass, setAnnouncementBarClass] = useState("hidden");
  const { userDetails, setUserDetails, isLoading } = useContext(GeneralContext);
  const [withProofGrading, setWithProofGrading] = useState(false);

  const [isWholeFeedback, setIsWholeFeedback] = useState(false);
  const [isLongFeedback, setIsLongFeedback] = useState(false);
  const [gradingStatus, setGradingStatus] = useState<string | null>(null);
  const [showGradingOverlay, setShowGradingOverlay] = useState<boolean>(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [studentNamesInFileNames, setStudentNamesInFileNames] = useState(false);

  const disableSavingCriteria = useRef(true);
  disableSavingCriteria.current =
    (isWholeFeedback
      ? highest + lowest + important + isWholeFeedback + age + isLongFeedback
      : highest +
        lowest +
        important +
        isWholeFeedback +
        rubrics +
        age +
        isLongFeedback) === fieldsSnapshot;

  const studentsExist = useRef(false);
  studentsExist.current = students.length > 0 ? true : false;

  const totalFilesRef = useRef(0);
  totalFilesRef.current = students
    .map((student: any) => student.files)
    .flat().length;

  const savedStudentsNamesInFileNames = getFromLocalStorage(
    "studentNamesInFileNames",
    false
  );

  const savedWithProofGrading = getFromLocalStorage("withProofGrading", false);

  useEffect(() => {
    setStudentNamesInFileNames(savedStudentsNamesInFileNames);
  }, [savedStudentsNamesInFileNames]);

  useEffect(() => {
    if (!savedWithProofGrading) return;
    setWithProofGrading(savedWithProofGrading);
  }, [savedWithProofGrading]);

  useEffect(() => {
    callTheServer({ endpoint: "getGradingCriteria", method: "GET" }).then(
      async (response: any) => {
        if (response?.status === 200) {
          const {
            highest,
            lowest,
            important,
            isWholeFeedback,
            rubrics,
            age,
            isLongFeedback,
          } = response.message;
          setHighest(highest);
          setLowest(lowest);
          setImportant(important);
          setIsWholeFeedback(isWholeFeedback);
          setRubrics(rubrics);
          setAge(age);
          setIsLongFeedback(isLongFeedback);

          const criteria = isWholeFeedback
            ? highest +
              lowest +
              important +
              isWholeFeedback +
              age +
              isLongFeedback
            : highest +
              lowest +
              important +
              isWholeFeedback +
              rubrics +
              age +
              isLongFeedback;

          setFieldsSnapshot(criteria);
        }
      }
    );
  }, []);

  useEffect(() => {
    getAllFromIndexedDb().then((res) => {
      if (res) {
        setStudents(res.reverse());
      }
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!userDetails?.emailVerified) setAnnouncementBarClass("");
    }
  }, [isLoading]);

  function handleSaveSelectedGradingStyle(withProofGrading: boolean) {
    setWithProofGrading(withProofGrading);
    setGradingResults(null);
    saveToLocalStorage("withProofGrading", withProofGrading);
  }

  function onAddStudentFiles(studentId: string, newFiles: File[]) {
    const newStudents = students.map((student: any) => {
      if (student.id === studentId) {
        const record = {
          ...student,
          files: [...student.files, ...newFiles],
        };

        saveToIndexedDb({ key: `Elagrade - ${studentId}`, data: record });
        return record;
      }

      return student;
    });

    setStudents(newStudents);
  }

  function onRemoveStudentFile(studentId: string, fileName: string) {
    return setStudents(
      students.map((student: any) => {
        if (student.id === studentId) {
          const updatedFiles = student.files.filter(
            (file: File) => file.name !== fileName
          );

          const record = {
            ...student,
            files: updatedFiles,
          };

          saveToIndexedDb({ key: `Elagrade - ${studentId}`, data: record });
          return record;
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

  function addStudentsInBulk(files: FileList | null) {
    if (!files) return;

    const filesArray = Array.from(files);

    const students: any[] = filesArray.map((file, index) => {
      const record = {
        name: `Student ${index + 1}`,
        id: v4(),
        files: [file],
      };

      saveToIndexedDb({ key: `Elagrade - ${record.id}`, data: record });
      return record;
    });

    setStudents(students);
  }

  function onRemoveStudentCard(studentToRemove: any) {
    setGradingResults(null);

    const newStudents = students.filter(
      (student: any) => student.id !== studentToRemove.id
    );

    deleteFromIndexedDb({ key: `Elagrade - ${studentToRemove.id}` });
    setStudents(newStudents);
  }

  async function saveCriteria() {
    const payload = {
      jsonCriteria: {
        isLongFeedback,
        age,
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
        ? highest + lowest + important + isWholeFeedback + age + isLongFeedback
        : highest +
          lowest +
          important +
          isWholeFeedback +
          rubrics +
          age +
          isLongFeedback;
      setFieldsSnapshot(criteria);

      return true;
    }

    return false;
  }

  async function handleGrade() {
    /* update upload times */
    const processingTimes = await callTheServer({
      endpoint: `getProcessingTime?${
        withProofGrading ? "withProofGrading=true" : "withProofGrading=false"
      }`,
      method: "GET",
    });

    let averageUploadTime = 60;
    let averageGradingTime = 180;

    if (processingTimes?.status === 200) {
      averageUploadTime = processingTimes?.message.uploadTime / 1000;
      averageGradingTime = processingTimes?.message.gradingTime / 1000;
    }

    setShowGradingOverlay(true);
    setGradingStatus("preparing");
    const allFileBatches = students.map((student: any) => student.files);
    const allUrls = [];

    setProcessingTime(averageUploadTime * allFileBatches.flat().length);

    const uploadStarted = new Date().getTime();
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

    const uploadEnded = new Date().getTime();

    /* update upload times */
    callTheServer({
      endpoint: "updateUploadTime",
      method: "POST",
      body: {
        uploadTime: (uploadEnded - uploadStarted) / allUrls.length,
        withProofGrading,
      },
    });

    /* grade if quota is ok */
    setGradingStatus("grading");
    setProcessingTime(averageGradingTime);
    const response = await callTheServer({
      endpoint: "gradePaper",
      method: "POST",
      body: {
        files: payload,
        assignmentName:
          assignmentName !== "" ? assignmentName : "Untitled assignment",
        studentNamesInFileNames,
        withProofGrading,
      },
    });

    if (response?.status === 200) {
      setGradingResults(response.message);
      setOpenAccordion(withProofGrading ? 4 : 3);
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

      if (response.message.title === "Self-check questions missing") {
        setOpenAccordion(4);
      }
      setGradingStatus(null);
      setShowGradingOverlay(false);
    } else {
      setAlertMessage(response?.message);
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

  const parts = [];

  parts.push(
    {
      title: "Name the assignment",
      html: (
        <DescriptionBox
          placeholder={"Example: Importance of sleep (24 Apr 24)"}
          text={assignmentName}
          setText={setAssignmentName}
        />
      ),
    },
    {
      title: "Upload the papers",
      html: (
        <>
          <div className={styles.upperRowUpload}>
            <label className={styles.namesCheckboxLabel}>
              <input
                type="checkbox"
                checked={studentNamesInFileNames}
                onChange={(e) => {
                  const result = e.currentTarget.checked;
                  saveToLocalStorage("studentNamesInFileNames", result);
                  setStudentNamesInFileNames(result);
                }}
              />
              Student names are in the file names
            </label>
            <label
              className={styles.namesCheckboxLabel}
              style={{
                padding: "0 1rem",
                margin: "0.5rem 0.5rem 0.5rem auto",
                border: "1px solid #303030",
                borderRadius: "1rem",
              }}
            >
              <input
                type="file"
                onChange={(e) => {
                  addStudentsInBulk(e.currentTarget.files);
                }}
                hidden
                multiple
              />
              Bulk upload
            </label>
          </div>
          <StudentsArea
            students={students}
            onAddStudentCard={onAddStudentCard}
            onRemoveStudentCard={onRemoveStudentCard}
            onAddStudentFiles={onAddStudentFiles}
            onRemoveStudentFile={onRemoveStudentFile}
          />
        </>
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
          age={age}
          important={important}
          isLongFeedback={isLongFeedback}
          setIsLongFeedback={setIsLongFeedback}
          setAge={setAge}
          setIsWholeFeedback={setIsWholeFeedback}
          setHighest={setHighest}
          setRubrics={setRubrics}
          setLowest={setLowest}
          setImportant={setImportant}
          saveCriteria={saveCriteria}
        />
      ),
    }
  );

  if (withProofGrading) {
    parts.push({
      title: "Set self-check questions",
      html: <SelfCheckQuestionsBox />,
    });
  }

  parts.push({
    title: "Grading result",
    html: (
      <GradingResult
        gradingResults={gradingResults}
        totalFiles={totalFilesRef.current}
        gradingStatus={gradingStatus}
      />
    ),
  });

  return (
    <>
      <Head>
        <title>Grading | Elagrade</title>
        <meta name="description" content={"Elagrade - Grading"} />
      </Head>
      <AnnouncementBar
        icon={<FaRegLightbulb />}
        customStyle={{ backgroundColor: "unset", cursor: "default" }}
        message="The free quota updates every month"
      />
      {showGradingOverlay && (
        <GradingOverlay
          seconds={processingTime}
          gradingStatus={gradingStatus}
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
          <div className={styles.gradingStyleBlock}>
            <p style={{ fontWeight: 600 }}>Grading methods</p>
            <div className={styles.gradingStyleButtons}>
              <GradingStyleButton
                withProofGradingType={false}
                withProofGrading={withProofGrading}
                selectType={handleSaveSelectedGradingStyle}
              />
              <GradingStyleButton
                withProofGradingType={true}
                withProofGrading={withProofGrading}
                selectType={handleSaveSelectedGradingStyle}
              />
            </div>
          </div>
          {parts.map((part: any, index: number) => {
            const showDonwloadAll =
              part.title === "Grading result" &&
              gradingResults?.assignmentReportUrl;
            const showPapersToGrade =
              part.title === "Upload the papers" && students.length > 0;

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
