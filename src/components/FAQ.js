import React, { useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Icons for expand/collapse
import "./FAQPage.css";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const answerRefs = useRef([]); // Refs for answer divs

  // FAQ Data
  const faqData = [
    {
      question: "What is the Ajmer Development Authority?",
      answer:
        "The Ajmer Development Authority (ADA) is a government body responsible for the planned development of Ajmer city. It focuses on infrastructure enhancement, urban growth, and heritage preservation.",
    },
    {
      question: "How can I apply for a housing scheme?",
      answer:
        "You can apply for housing schemes through the ADA website. Navigate to the 'Schemes' section, select the desired scheme, and follow the application process.",
    },
    {
      question: "What documents are required for scheme applications?",
      answer:
        "Typically, you will need your Aadhar card, proof of residence, income certificate, and recent photographs. Specific requirements may vary depending on the scheme.",
    },
    {
      question: "How can I check the status of my application?",
      answer:
        "You can check the status of your application by logging into your account on the ADA website and navigating to the 'Application Status' section.",
    },
    {
      question: "What are the ongoing projects in Ajmer?",
      answer:
        "Ongoing projects include road expansion, heritage restoration, and eco-park development. Visit the 'Projects' section on the ADA website for more details.",
    },
    {
      question: "How can I contact the Ajmer Development Authority?",
      answer:
        "You can contact ADA through their official email (ada@rajasthan.gov.in) or visit their office at [Address]. Phone support is also available during working hours.",
    },
  ];

  // Toggle FAQ item
  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Collapse if already open
    } else {
      setActiveIndex(index); // Expand the clicked item
    }
  };

  return (
    <div
      className="faq-page min-h-screen p-8"
      style={{ backgroundColor: "#f5f5dc" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#4b0082] mb-8 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-[#4b0082] overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left text-[#4b0082] hover:bg-[#4b0082] hover:text-white rounded-lg transition-all duration-300"
              >
                <span className="font-semibold">{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              <div
                ref={(el) => (answerRefs.current[index] = el)}
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{
                  maxHeight:
                    activeIndex === index
                      ? `${answerRefs.current[index]?.scrollHeight}px`
                      : "0",
                  opacity: activeIndex === index ? 1 : 0,
                }}
              >
                <div className="p-4 pt-2 text-gray-700 text-left border-t border-[#4b0082]">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
