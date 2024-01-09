import { IoIosCheckmarkCircle } from "react-icons/io";
import { useRouter } from "next/router";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import Button from "@/components/Button";
import Banner from "@/components/Banner";
import styles from "./Index.module.scss";

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Banner />
      <div className={styles.box}>
        <h3 className={styles.intro_title}>
          Embrace Teaching Without The Burden Of Grading
        </h3>
        <p className={styles.intro_body}>
          After a long and exhausting day the thought of assignments awaiting
          you in the drawer can be really overwhelming. It's a familiar scene
          for many educators: you're exhausted, yet there's still a pile of
          paperwork that should have been graded already today.
        </p>
        <p className={styles.intro_body}>
          But imagine a different world, one where you can reclaim your time for
          self-care, family, or professional development and never have to grade
          assignments anymore. With elagrade you can do just that - grade your
          whole class in minutes, all while maintaining your personal grading
          style and providing personalized feedback for each student. No more
          late nights buried in papers, no more weekends lost to grading
          marathons. Embrace the freedom to relax and enjoy your personal time,
          knowing that you've met all of the requirements and your students are
          receiving the attention and feedback they need.
        </p>
      </div>
      <div className={styles.full_width}>
        <div className={styles.box}>
          <h3 className={styles.how_title}>End The Unpaid After-Hours</h3>
          <YoutubeEmbed
            videoId="PlYEQQreR-M"
            title="Elagrade - Automatic Grading For Ela Teachers"
          />
        </div>
      </div>
      <div className={styles.box} style={{ marginTop: "0.5rem" }}>
        <h3 className={styles.how_title}>
          More Time, More Energy, Better Motivation
        </h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            <IoIosCheckmarkCircle className={styles.icon} />
            Grade 30-50-100 papers in one click with your personal grading style
          </li>
          <li className={styles.item}>
            <IoIosCheckmarkCircle className={styles.icon} />
            Get a grade, explanation and unique feedback for every uploaded
            paper
          </li>
          <li className={styles.item}>
            <IoIosCheckmarkCircle className={styles.icon} />
            Upload handwritten assignments by taking pictures, and electronic
            ones with PDFs
          </li>
          <li className={styles.item}>
            <IoIosCheckmarkCircle className={styles.icon} />
            Get better sleep, better mood, and stronger motivation for work
          </li>
        </ul>
      </div>
      <Button
        customStyle={{ maxWidth: "15rem", width: "100%", marginBottom: "4rem" }}
        innerStyle={{ fontSize: "1.25rem" }}
        buttonText="Start grading now"
        onClick={() => router.push("/grading")}
      />
    </div>
  );
}
