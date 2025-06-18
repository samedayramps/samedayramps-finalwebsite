"use client";
import React from "react";
import { Grid, Flex, Text, Heading } from "@radix-ui/themes";
import { 
  HiOutlinePencilSquare, 
  HiOutlineWrenchScrewdriver, 
  HiOutlineCalendarDays, 
  HiOutlineTruck 
} from "react-icons/hi2";

const steps = [
  {
    icon: HiOutlinePencilSquare,
    title: "Get a Quote",
    description: "Call us or fill out our form for an instant, no-obligation quote.",
  },
  {
    icon: HiOutlineWrenchScrewdriver,
    title: "We Install",
    description: "A certified technician installs your ramp, often on the same day.",
  },
  {
    icon: HiOutlineCalendarDays,
    title: "You Rent",
    description: "Flexible, affordable monthly rental for as long as you need.",
  },
  {
    icon: HiOutlineTruck,
    title: "We Remove",
    description: "When you're done, we pick it up for free, leaving no trace.",
  },
];

const HowItWorks: React.FC = () => (
  <section className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <Flex direction="column" align="center" gap="4" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <Heading as="h2" size="7" weight="bold" className="text-gray-900 dark:text-white">
          Our Simple 4-Step Process
        </Heading>
        <Text as="p" size="4" className="text-gray-600 dark:text-gray-400">
          Get a professional-grade ramp with no hassle or long-term commitments.
        </Text>
      </Flex>

      {/* Steps Grid */}
      <Grid columns={{ initial: "1", sm: "2", md: "4" }} gap={{ initial: "8", md: "6" }}>
        {steps.map((step, index) => (
          <Flex key={index} direction="column" align="center" className="text-center" gap="3">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
              <step.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <Heading as="h3" size="4" weight="bold" className="text-gray-900 dark:text-white">
              Step {index + 1}: {step.title}
            </Heading>
            <Text as="p" size="3" className="text-gray-600 dark:text-gray-400">
              {step.description}
            </Text>
          </Flex>
        ))}
      </Grid>
    </div>
  </section>
);

export default HowItWorks; 