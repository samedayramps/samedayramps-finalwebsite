"use client";
import React from "react";
import Link from "next/link";
import { Flex, Text, Heading, Grid } from "@radix-ui/themes";
import { HiOutlinePhone, HiOutlineEnvelope } from "react-icons/hi2";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Grid columns={{ initial: "1", md: "3" }} gap="8">
          {/* Company Info */}
          <Flex direction="column" gap="4">
            <Heading as="h3" size="4" weight="bold" className="text-gray-100">Same Day Ramps</Heading>
            <Text as="p" size="3" className="text-gray-400">
              The fastest, most reliable wheelchair ramp rentals in Dallas-Fort Worth, installed within 24 hours.
            </Text>
          </Flex>

          {/* Contact Info */}
          <Flex direction="column" gap="4">
            <Heading as="h4" size="4" weight="bold" className="text-gray-100">Contact Us</Heading>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="h-5 w-5 text-gray-400" />
                <a href="tel:+1-940-536-9626" className="text-base text-gray-300 hover:text-white transition-colors">(940) 536-9626</a>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineEnvelope className="h-5 w-5 text-gray-400" />
                <a href="mailto:info@samedayramps.com" className="text-base text-gray-300 hover:text-white transition-colors">info@samedayramps.com</a>
              </li>
            </ul>
          </Flex>

          {/* CTA */}
          <Flex direction="column" gap="4">
            <Heading as="h4" size="4" weight="bold" className="text-gray-100">Ready to Get Started?</Heading>
            <Text as="p" size="3" className="text-gray-400">
              Get a free, no-obligation quote in seconds.
            </Text>
            <Link href="/#quote-form" passHref>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#eafc2b] hover:bg-[#dceb29] text-gray-900 font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#eafc2b] focus:ring-offset-2 w-full sm:w-auto"
              >
                Get A Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
          </Flex>
        </Grid>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <Text as="p" size="2">
            © {new Date().getFullYear()} Same Day Ramps. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 