"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex, Button } from "@radix-ui/themes";

const Hero: React.FC = () => (
  <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px]">
    <Image
      src="/hero1.webp"
      alt="A wheelchair ramp installed on the exterior of a home."
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
    <div className="relative z-10 h-full">
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="h-full text-center text-white px-4"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold max-w-4xl mb-4 text-shadow">
          Wheelchair Ramp Rentals
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-medium max-w-3xl mb-8 text-shadow-sm">
          Installed within 24 hours across Dallas-Fort Worth
        </p>
        <Link href="/#quote-form" passHref>
          <Button
            asChild
            size="3"
            className="cursor-pointer font-bold text-gray-900"
            aria-label="Get a quote"
          >
            <a>
              Get A Quote
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </Button>
        </Link>
      </Flex>
    </div>
  </section>
);

export default Hero; 