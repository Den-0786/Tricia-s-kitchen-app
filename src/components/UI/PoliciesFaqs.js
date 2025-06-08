'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const policiesText = `
- We respect your privacy and only collect basic information for order delivery.
- Refunds are available within 24 hours of delivery.
- We are not responsible for delays caused by third-party delivery services.
- By ordering, you agree to our terms and policies.
`;

const legalText = `
"Terms and Conditions"

1. You agree to provide accurate information during purchase.
2. We reserve the right to refuse or cancel any orders.
3. Delivery times are estimates and not guaranteed.
4. Our liability is limited to the cost of the purchased goods.
5. By using our service, you accept these terms.
`;

const faqs = [
    {
        question: "Do you do delivery?",
        answer:
        "Yes, we do delivery within Kumasi.",
    },
    {
        question: "How long does it take to get my order?",
        answer:
        "Delivery typically takes 45minutes or less depending on your location.",
    },
    {
        question: "What is your refund policy?",
        answer:
        "You can request a refund or exchange within 2 hours of receiving your order. Please contact our support.",
    },
    {
        question: "How do you protect my privacy?",
        answer:
        "We only collect the minimum data necessary for order fulfillment and never share your information with third parties.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
        "We accept Mobile Money and Cash on Delivery for now, Visa and other payments method will be available soon.",
    },
    {
        question: "What are your offers",
        answer: 
        "Our offers includes, Wedding, Engagement, Birthday parties, Graduations and all other Events"
    },
    ];

    export default function PoliciesFaqsModal({isOpen, onClose}) {
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeTab, setActiveTab] = useState("faqs"); 

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
        <AnimatePresence>
            {isOpen && (
            <motion.div
                key="modalOverlay"
                className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                key="modalContent"
                className="bg-white rounded-lg max-w-xl w-full max-h-[80vh] overflow-y-auto p-2 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                >
                <h2 className="text-2xl font-bold mb-6 text-center text-amber-950">
                    FAQs Policies & Legal
                </h2>

                {/* Tabs */}
                <div className="flex justify-center mb-6 space-x-6 border-b border-gray-300">
                    {["faqs", "policies", "legal"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                        setActiveTab(tab);
                        setActiveIndex(null);
                        }}
                        className={`pb-2 font-semibold ${
                        activeTab === tab
                            ? "border-b-2 border-amber-600 text-amber-800"
                            : "text-gray-600 hover:text-amber-800"
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === "faqs" && (
                    <div className="space-y-4">
                    {faqs.map((item, index) => (
                        <div key={index} className="border-b border-gray-300 pb-3">
                        <button
                            onClick={() => toggleFaq(index)}
                            className="w-full text-left flex justify-between items-center focus:outline-none"
                            aria-expanded={activeIndex === index}
                        >
                            <span className="font-semibold text-gray-800">
                            {item.question}
                            </span>
                            <span className="text-xl font-bold text-amber-800">
                            {activeIndex === index ? "-" : "+"}
                            </span>
                        </button>

                        <AnimatePresence>
                            {activeIndex === index && (
                            <motion.p
                                key="answer"
                                className="mt-2 text-gray-700"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {item.answer}
                            </motion.p>
                            )}
                        </AnimatePresence>
                        </div>
                    ))}
                    </div>
                )}

                {activeTab === "policies" && (
                    <pre className="whitespace-pre-wrap text-gray-700">{policiesText}</pre>
                )}

                {activeTab === "legal" && (
                    <pre className="whitespace-pre-wrap text-gray-700">{legalText}</pre>
                )}

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-amber-800 hover:bg-amber-600 text-white py-2 rounded-md"
                >
                    Close
                </button>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
        </>
    );
    }
