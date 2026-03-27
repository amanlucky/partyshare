import React, { useState } from "react";
import "./faq.css";

const faqData = [
  {
    question: "How does PartyShare work?",
    answer:
      "PartyShare connects renters with vendors, offering a seamless booking experience.",
  },
  {
    question: "Who do I rent from?",
    answer:
      "You rent directly from the vendor. PartyShare provides the marketplace, payment system, and messaging tools.",
  },
  {
    question: "Do vendors offer delivery?",
    answer:
      "Yes, many vendors offer delivery options depending on location.",
  },
  {
    question: "Is a deposit required?",
    answer:
      "Some vendors may require a refundable deposit.",
  },
  {
    question: "How do I contact the vendor?",
    answer:
      "You can contact vendors through the platform messaging system.",
  },
  {
    question: "What happens if something is damaged?",
    answer:
      "Damage policies vary by vendor and are outlined in listing terms.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-wrapper">

      {/* HEADER */}
      <div className="faq-header">
        <h2>FAQ</h2>
        <button className="vendor-btn">Become a Vendor</button>
      </div>

      {/* FAQ LIST */}
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >

            {/* QUESTION */}
            <div className="faq-question" onClick={() => toggle(index)}>
              <span className={activeIndex === index ? "active-text" : ""}>
                {item.question}
              </span>
              <span className="icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>

            {/* ANSWER */}
            {activeIndex === index && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;