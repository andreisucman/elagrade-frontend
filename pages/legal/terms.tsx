import React from "react";
import styles from "./legal.module.scss";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const Terms = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Terms Of Service</h2>
        <h3>Acceptance of Terms</h3>
        <p>
          By accessing or using the <b>teachersgradingassistant.com</b> website
          (the &quot;Site&quot;), you agree to comply with and be bound by these
          Terms of Service (&quot;Terms&quot;). If you do not agree to these
          Terms, please do not use the Site.
        </p>

        <h3>Description of Service</h3>
        <p>
          teachersgradingassistant.com is a publishing company that offers their
          products to the user in the form of digital books.
        </p>

        <h3>User Obligations</h3>
        <p>
          (a) You certify that all information you provide is accurate,
          up-to-date, and complete. (b) You agree not to use the Site for any
          illegal or unauthorized purpose.
        </p>

        <h3>Data Use and Privacy</h3>
        <p>
          By using the Site, you acknowledge and agree that
          teachersgradingassistant.com may analyze the information you submit
          for advertising purposes and to enhance the user experience{" "}
          <a href="/legal/privacy">
            <u>Privacy Policy</u>
          </a>
          .
        </p>

        <h3>Intellectual Property Rights</h3>
        <p>
          (a) All content and services provided on the Site are protected by
          copyright, trademark, and other applicable intellectual property
          rights. (b) You grant the teachersgradingassistant.com a worldwide,
          royalty-free, and non-exclusive license to reproduce, modify,
          distribute, and publish the content you upload for the sole purpose of
          providing the Site&quot;s services.
        </p>

        <h3>Limitation of Liability</h3>
        <p>
          teachersgradingassistant.com shall not be liable for any indirect,
          incidental, special, or consequential damages resulting from the use
          or the inability to use the Site.
        </p>

        <h3>Disclaimers</h3>
        <p>
          (a) The Site is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis. teachersgradingassistant.com makes no
          warranties, expressed or implied, regarding the accuracy, reliability,
          or completeness of the Site&quot;s content. (b)
          teachersgradingassistant.com does not guarantee job placement or the
          suitability of any job listing.
        </p>

        <h3>Indemnification</h3>
        <p>
          You agree to indemnify and hold teachersgradingassistant.com, its
          affiliates, officers, and employees, harmless from any claim or demand
          due to your breach of these Terms or the documents it incorporates by
          reference, or your violation of any law or the rights of a third
          party.
        </p>

        <h3>Changes to Terms of Service</h3>
        <p>
          teachersgradingassistant.com reserves the right to modify these Terms
          at any time. Continued use of the Site after changes to the Terms
          constitutes your acceptance of the new terms.
        </p>

        <h3>Termination</h3>
        <p>
          We may terminate or suspend your access to our Site and services
          immediately, without prior notice, for any breach of these Terms.
        </p>

        <h3>Governing Law</h3>
        <p>
          These Terms shall be governed by the laws of the United States,
          without respect to its conflict of laws principles.
        </p>

        <h3>Contact</h3>
        <p>
          For any questions or concerns related to these Terms, please contact
          us at{" "}
          <a href="/contact">
            <u>teachersgradingassistant.com/contact</u>
          </a>
          .
        </p>
        <p>
          <b>Smart Moms Tech</b>
        </p>
        <p>Purrma LLC</p>
        <p>30N Gould St Ste R</p>
        <p>Sheridan WY 82801, US</p>
        <p>Last Updated: 18 November 2023</p>
      </div>
    </div>
  );
};

export default Terms;
