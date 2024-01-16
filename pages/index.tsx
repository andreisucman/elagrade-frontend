import { useContext } from "react";
import { GeneralContext } from "@/state/GeneralContext";
import Head from "next/head";
import { useRouter } from "next/router";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import { IoIosCheckmarkCircle } from "react-icons/io";
import FAQ from "@/components/FAQ";
import { testimonials, faqs } from "../data/data";
import Testimonials from "@/components/Testimonials";
import Button from "@/components/Button";
import Banner from "@/components/Banner";
import styles from "./Index.module.scss";

export default function Home() {
  const { userDetails } = useContext(GeneralContext);
  const router = useRouter();

  function handleRoute() {
    if (userDetails?.email !== "") {
      router.push("/grading");
    } else {
      router.push("/sign-up");
    }
  }

  return (
    <>
      <Head>
        <title>Home | Elagrade</title>
        <meta name="description" content={"Elagrade - Home Page"} />
      </Head>
      <div className={styles.container}>
        <Banner handleRoute={handleRoute} />
        <div className={styles.group} id="intro" style={{ maxWidth: "60rem" }}>
          <h3 className={styles.intro_title}>
            Embrace Teaching Without The Burden Of Grading
          </h3>
          <p className={styles.intro_body}>
            After a long and exhausting day the thought of assignments waiting
            for you in the drawer can be really overwhelming. It's a familiar
            scene for many educators: you're exhausted, yet there is a pile of
            essays that should have been graded already today.
          </p>
          <p className={styles.intro_body}>
            But imagine a different world, one where you have time for
            self-care, family, or professional development because you don't
            lose it to grading.
          </p>
          <p className={styles.intro_body}>
            With Elagrade, you can do just that - grade your whole class in
            minutes all while maintaining your personal style and providing
            feedback to each student. No more late nights buried in papers, no
            more weekends lost to grading marathons.
          </p>
          <p className={styles.intro_body}>
            Embrace the freedom to relax and enjoy your free time, knowing that
            you've met all of the requirements, and your students get the
            attention and feedback they need.
          </p>
          <Button
            customStyle={{
              width: "100%",
            }}
            id={"home_upper_cta"}
            innerStyle={{ fontSize: "1.15rem" }}
            buttonText="Start grading now"
            // onClick={handleRoute}
            onClick={() => {}}
          />
        </div>

        <div className={styles.full_width}>
          <div className={styles.group} style={{ gap: "1.5rem" }}>
            <h3 className={styles.how_title}>End The Unpaid After-Hours</h3>

            <YoutubeEmbed
              videoId="PlYEQQreR-M"
              title="Elagrade - Automatic Grading For Ela Teachers"
            />
          </div>
        </div>
        <div className={styles.group} style={{ marginTop: "0.5rem" }}>
          <h3 className={styles.how_title}>
            More Time, More Energy, Better Motivation
          </h3>
          <ul className={styles.list}>
            <li className={styles.item}>
              <IoIosCheckmarkCircle className={styles.icon} />
              Grade 10-50-100 papers in one click with your personal grading
              style.
            </li>
            <li className={styles.item}>
              <IoIosCheckmarkCircle className={styles.icon} />
              Specify your unique rubrics you want the grading to be made on.
            </li>
            <li className={styles.item}>
              <IoIosCheckmarkCircle className={styles.icon} />
              Get a grade, explanation and feedback for every uploaded paper.
            </li>
            <li className={styles.item}>
              <IoIosCheckmarkCircle className={styles.icon} />
              Upload handwritten assignments by taking pictures and electronic
              ones with pdf, doc or txt files.
            </li>
            <li className={styles.item}>
              <IoIosCheckmarkCircle className={styles.icon} />
              Grade hard to understand text without draining your mind.
            </li>
          </ul>
        </div>
        <div
          className={styles.group}
          style={{ marginTop: "0.5rem", maxWidth: "70rem" }}
        >
          <h3 className={styles.how_title}>
            What Can You Do With The Time Saved
          </h3>
          <ul className={styles.boxes}>
            <li className={styles.box}>
              <div
                style={{ width: "3rem", height: "3rem" }}
                className={"icon icon__money"}
              />
              Get a side hustle and earn extra cash
            </li>
            <li className={styles.box}>
              <div
                style={{ width: "3rem", height: "3rem" }}
                className={"icon icon__workout"}
              />
              Start working out to get in shape
            </li>
            <li className={styles.box}>
              <div
                style={{ width: "3rem", height: "3rem" }}
                className={"icon icon__sleep"}
              />
              Get better sleep, mood, and motivation for work
            </li>
            <li className={styles.box}>
              <div
                style={{ width: "3rem", height: "3rem" }}
                className={"icon icon__game"}
              />
              Start a new hobby, book, or a video game you love
            </li>
          </ul>
          <Button
            customStyle={{
              width: "100%",
              marginTop: "0.5rem",
            }}
            id={"home_lower_cta"}
            innerStyle={{ fontSize: "1.15rem" }}
            buttonText="Start grading free"
            onClick={handleRoute}
          />
        </div>

        <FAQ faqs={faqs} />
        <Testimonials title={"What Teachers Say"} testimonials={testimonials} />
      </div>
    </>
  );
}
