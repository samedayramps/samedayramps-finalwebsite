"use client";
import React from "react";
import { Grid, Flex, Text } from "@radix-ui/themes";
import { HiOutlineCalendarDays, HiOutlineShieldCheck, HiOutlineCurrencyDollar } from "react-icons/hi2";

const features = [
  {
    icon: <HiOutlineCalendarDays className="h-7 w-7 text-blue-500" />,
    text: "Month-to-Month Rentals",
  },
  {
    icon: <HiOutlineShieldCheck className="h-7 w-7 text-blue-500" />,
    text: "ADA Compliant",
  },
  {
    icon: <HiOutlineCurrencyDollar className="h-7 w-7 text-blue-500" />,
    text: "Transparent Pricing",
  },
];

const FeatureBar: React.FC = () => (
  <section className="bg-gray-100 dark:bg-gray-800 py-6 sm:py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Grid
        columns={{ initial: "1", sm: "3" }}
        gap={{ initial: "6", sm: "4" }}
        className="text-center"
      >
        {features.map((feature, index) => (
          <Flex
            key={index}
            direction="column"
            align="center"
            justify="center"
            gap="2"
          >
            {feature.icon}
            <Text as="p" size="4" weight="medium" className="text-gray-900 dark:text-white">
              {feature.text}
            </Text>
          </Flex>
        ))}
      </Grid>
    </div>
  </section>
);

export default FeatureBar; 