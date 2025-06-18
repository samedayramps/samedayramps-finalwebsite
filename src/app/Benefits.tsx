"use client";
import React from "react";
import { Flex, Text, Heading } from "@radix-ui/themes";
import { HiCheckCircle } from "react-icons/hi2";

const benefitsList = [
  { text: "Hospital discharge - Get home fast, heal better" },
  { text: "Surgery recovery - Temporary access, not permanent cost" },
  { text: "Time to plan - Safe access while figuring out your permanent solution" },
  { text: "Family visits - Short-term access for special occasions" },
];

const Benefits: React.FC = () => (
  <section className="bg-white dark:bg-black py-16 sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Centered Main Headline */}
      <div className="text-center max-w-4xl mx-auto">
        <Heading as="h2" size="8" weight="bold" className="text-gray-900 dark:text-white">
          You shouldn&apos;t have to wait weeks or spend thousands of dollars on a temporary solution.
        </Heading>
      </div>

      {/* Subheading and List Container */}
      <div className="max-w-3xl mx-auto mt-12">
        <Text as="p" size="4" className="text-gray-600 dark:text-gray-400">
          We handle everything so you can focus on getting better.
        </Text>

        {/* Benefit List */}
        <Flex direction="column" gap="4" className="mt-8">
          {benefitsList.map((benefit, index) => (
            <Flex key={index} align="start" gap="3">
              <HiCheckCircle className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0" />
              <Text as="p" size="3">
                <span className="font-medium text-gray-800 dark:text-gray-100">{benefit.text.split(" - ")[0]}</span>
                <span className="text-gray-600 dark:text-gray-400"> - {benefit.text.split(" - ")[1]}</span>
              </Text>
            </Flex>
          ))}
        </Flex>
      </div>
    </div>
  </section>
);

export default Benefits; 