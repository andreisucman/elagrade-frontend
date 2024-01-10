import { v4 } from "uuid";
import React, { useState, useEffect, useContext, useRef } from "react";
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
import InsufficientFunds from "@/components/ProblemPopup";
import AnnouncementBar from "@/components/AnnouncementBar";
import Alert from "@/components/Alert";
import styles from "./grading.module.scss";

const Grading = () => {
  const [students, setStudents] = useState<any>([]);
  const [highest, setHighest] = useState("");
  const [lowest, setLowest] = useState("");
  const [rubrics, setRubrics] = useState("");
  const [important, setImportant] = useState("");
  const [gradingSystem, setGradingSystem] = useState("");
  const [fieldsSnapshot, setFieldsSnapshot] = useState("");
  const [gradingResults, setGradingResults] = useState<any>(null);
  const [showGradingOverlay, setShowGradingOverlay] = useState(false);
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

  const disableSavingCriteria = useRef(true);
  disableSavingCriteria.current =
    (isWholeFeedback
      ? highest + lowest + important + gradingSystem + isWholeFeedback
      : highest +
        lowest +
        important +
        gradingSystem +
        isWholeFeedback +
        rubrics) === fieldsSnapshot;

  const studentsExist = useRef(false);
  studentsExist.current = students.length > 0 ? true : false;

  useEffect(() => {
    callTheServer({ endpoint: "getGradingCriteria", method: "GET" }).then(
      async (response: any) => {
        if (response?.status === 200) {
          const {
            highest,
            lowest,
            important,
            grading_system,
            isWholeFeedback,
            rubrics,
          } = response.message;
          setHighest(highest);
          setLowest(lowest);
          setImportant(important);
          setGradingSystem(grading_system);
          setIsWholeFeedback(isWholeFeedback);
          setRubrics(rubrics);

          const criteria = isWholeFeedback
            ? highest + lowest + important + grading_system + isWholeFeedback
            : highest +
              lowest +
              important +
              grading_system +
              isWholeFeedback +
              rubrics;

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
        grading_system: gradingSystem,
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
        ? highest + lowest + important + gradingSystem + isWholeFeedback
        : highest +
          lowest +
          important +
          gradingSystem +
          isWholeFeedback +
          rubrics;
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
    const allFileBatches = students.map((student: any) => student.files);
    const allUrls = [];

    for (let fileGroup of allFileBatches) {
      const formData = new FormData();
      for (const file of fileGroup) {
        let mimeType = file.type.includes("image") ? "image" : "pdf";

        if (mimeType === "image") {
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

    // Prepare payload for grading endpoint
    const payload: any = allUrls.map((batch) =>
      batch.map((url: string) => {
        let mimeType =
          url.includes(".jpg") || url.includes(".png") ? "image" : "pdf";
        return { type: mimeType, url };
      })
    );

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
      setShowGradingOverlay(false);
      setOpenAccordion(3);
      setUserDetails(
        Object.assign({}, userDetails, {
          pagesLeft: response.message.pagesLeft,
        })
      );
    } else if (response?.status === 400) {
      setProblemPopupMessage(response?.message);
      setShowGradingOverlay(false);

      if (response.message === "grading criteria missing") {
        setOpenAccordion(2);
      }
    }
  }

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  async function resendVerificationEmail() {
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
          gradingSystem={gradingSystem}
          setIsWholeFeedback={setIsWholeFeedback}
          setHighest={setHighest}
          setRubrics={setRubrics}
          setLowest={setLowest}
          setImportant={setImportant}
          setGradingSystem={setGradingSystem}
          saveCriteria={saveCriteria}
        />
      ),
    },
    {
      title: "Grading result",
      html: <GradingResult gradingResults={gradingResults} />,
    },
  ];

  return (
    <>
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
            <InsufficientFunds
              message={problemPopupMessage}
              setShowModal={() => setProblemPopupMessage(null)}
            />
          )}
          {showGradingOverlay && <GradingOverlay />}
          <GradingHeader />
          {parts.map((part: any, index: number) => (
            <div key={index} className={styles.accordionItem}>
              <div
                className={styles.accordionQuestion}
                onClick={() => toggleAccordion(index)}
              >
                <p className={styles.accordionItemTitle}>{part.title}</p>
                {openAccordion === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {openAccordion === index && (
                <div className={styles.accordionAnswer}>{part.html}</div>
              )}
            </div>
          ))}

          {studentsExist.current && (
            <GradingFooter
              students={students}
              gradingResults={gradingResults}
              handleGrade={handleGrade}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Grading;
