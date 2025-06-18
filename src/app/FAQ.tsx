"use client";
import React from "react";
import { Heading, Text } from "@radix-ui/themes";
import * as Accordion from "@radix-ui/react-accordion";
import { HiChevronDown } from "react-icons/hi2";

const faqs = [
  {
    question: "Are your ramps ADA compliant?",
    answer: "Yes, all our ramps meet ADA compliance standards. We ensure proper slope ratios and safety features for maximum accessibility and security.",
  },
  {
    question: "What areas do you serve?",
    answer: "We serve the entire Dallas-Fort Worth metroplex, including surrounding areas. Contact us to confirm service availability in your specific location.",
  },
  {
    question: "Do you offer rent-to-own options?",
    answer: "Yes, we offer flexible rent-to-own options. This allows you to try the ramp first and purchase it if it meets your long-term needs.",
  },
  {
    question: "What if I need the ramp removed?",
    answer: "We'll remove the ramp at no additional cost when you no longer need it. Just give us a call, and we'll schedule the removal.",
  },
  {
    question: "Do you work with insurance companies?",
    answer: "While we don't directly bill insurance, we can provide documentation for you to submit to your insurance company for reimbursement.",
  },
];

const FAQ: React.FC = () => (
  <section className="bg-white dark:bg-gray-950 py-16 sm:py-24">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <Heading as="h2" size="7" weight="bold" className="text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </Heading>
      </div>

      {/* Accordion */}
      <Accordion.Root type="multiple" className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <Accordion.Item key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-700">
            <Accordion.Header>
              <Accordion.Trigger className="flex justify-between items-center w-full py-4 text-left text-lg font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md px-4 group">
                {faq.question}
                <HiChevronDown className="h-6 w-6 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-4 py-4 text-gray-600 dark:text-gray-300">
              <Text as="p" size="3" className="text-base">
                {faq.answer}
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  </section>
);

export default FAQ; 