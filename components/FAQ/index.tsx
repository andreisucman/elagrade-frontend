import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./FAQ.module.scss";

type Faq = {
  question: string;
  answer: string;
  id: string;
};

type Props = {
  faqs: Faq[];
};

const FAQ = ({ faqs }: Props) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Your Questions Answered</h2>
        {faqs.map((faq, index) => (
          <div key={index} id={faq.id} className={styles.item}>
            <div className={styles.question} onClick={() => toggleFAQ(index)}>
              {faq.question}
              {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {openFAQ === index && (
              <div className={styles.answer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
