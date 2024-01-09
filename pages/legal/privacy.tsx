import React from "react";
import styles from "./legal.module.scss";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const Privacy = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Privacy Policy</h2>
        <h3>Introduction</h3>
        <p>
          This Privacy Policy outlines the practices of PURRMA LLC
          (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) regarding the
          collection, use, and protection of personal information we gather from
          users of our range of free applications (&quot;Services&quot;).
        </p>
        <h3>Information We Collect</h3>
        <ul className={styles.list}>
          <li>- Email address</li>
          <li>- Name</li>
          <li>- OpenID</li>
        </ul>
        <h3>Use of Information</h3>
        <p>
          The information we collect is primarily used for the following
          purposes:
        </p>
        <ul className={styles.list}>
          <li>- To provide, maintain, and improve our Services.</li>
          <li>
            - For communication regarding updates, security alerts, and support
            messages.
          </li>
          <li>
            - For advertising purposes, including tailoring ads that may be of
            interest to users.
          </li>
          <li>
            - To analyze how users interact with our Services to improve user
            experience.
          </li>
        </ul>
        <h3>Non-Disclosure of Information</h3>
        <p>We are committed to protecting user privacy. Thus:</p>
        <ul className={styles.list}>
          <li>
            - We do not sell or share your personal information with third
            parties for their marketing purposes.
          </li>
          <li>
            - Access to personal information is strictly limited to employees
            and contractors who need the information to perform their job
            functions.
          </li>
        </ul>
        <h3>Sharing Information with Technology Partners</h3>
        <p>
          We rely on technology and services supplied by our partners to operate
          our Services. Therefore, we may share your information with these
          partners to the extent necessary for the provision and improvement of
          the Services. We ensure that our partners are committed to protecting
          your information and use it solely for the purposes set forth in this
          policy.
        </p>

        <h3>Data Security</h3>
        <p>
          We implement a variety of security measures to maintain the safety of
          your personal information. However, no method of transmission over the
          Internet, or method of electronic storage, is 100% secure.
        </p>
        <h3>User Rights</h3>
        <p>Users have the right to:</p>
        <ul className={styles.list}>
          <li>
            - Access and receive a copy of the personal data we hold about them.
          </li>
          <li>- Request correction of any incorrect or incomplete data.</li>
          <li>
            - Ask for deletion of their personal data, subject to certain
            conditions.
          </li>
          <li>
            - Object to processing of their data for advertising purposes.
          </li>
        </ul>
        <h3>Changes to This Policy</h3>
        <p>
          We may update this policy from time to time. We will notify users of
          any changes by posting the new policy on this page and updating the
          “Effective Date” at the top.
        </p>
        <h3>Contact Us</h3>
        <p>
          For any questions about this Privacy Policy, please contact us at:
          info@teachersgradingassistant.com.
        </p>
        <h3>Acknowledgement</h3>
        <p>
          By using our Services, you acknowledge that you have read and
          understood this Privacy Policy.
        </p>
        <p>Last Updated: 18 November 2023</p>
      </div>
    </div>
  );
};

export default Privacy;
