"use client";
import Image from "next/image";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";

const NAV_LINKS = [
  { name: "Features", href: "#features", ariaLabel: "View Features section" },
  { name: "Pricing", href: "#pricing", ariaLabel: "View Pricing section" },
  { name: "Contact", href: "#contact", ariaLabel: "Contact us" },
];

const Header: React.FC = () => {
  return (
    <Dialog.Root>
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20 shadow-sm supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
        <nav
          className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 py-0 h-20 sm:h-24"
          aria-label="Main navigation"
          role="navigation"
        >
          {/* Logo */}
          <a
            href="#"
            aria-label="Go to homepage"
            className="group flex items-center gap-3 rounded-xl p-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 hover:scale-105"
          >
            <Image
              src="/Dark Blue.png"
              alt="Sameday Ramps logo"
              width={160}
              height={160}
              className="object-contain w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:w-32 lg:w-36 lg:h-36 transition-transform duration-200 group-hover:scale-105"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <NavigationMenu.Root className="hidden lg:flex items-center justify-center">
            <NavigationMenu.List className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavigationMenu.Item key={link.name}>
                  <NavigationMenu.Link
                    href={link.href}
                    aria-label={link.ariaLabel}
                    className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 rounded-lg hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                  >
                    {link.name}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:9405369626"
              aria-label="Call now (940) 536-9626"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (940) 536-9626
            </a>
            <Link href="/#quote-form" passHref>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#eafc2b] hover:bg-[#dceb29] text-gray-900 font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#eafc2b] focus:ring-offset-2"
                aria-label="Get a quote"
              >
                Get A Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Dialog.Trigger asChild>
            <button
              className="lg:hidden relative flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 transition-all duration-200 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 active:scale-95"
              aria-label="Open menu"
            >
              <span className="sr-only">Open menu</span>
              <span className="relative w-6 h-6 flex items-center justify-center">
                <span className="absolute left-0 top-1/2 -translate-y-1.5 w-6 h-0.5 bg-gray-700 dark:bg-gray-200 rounded-full" />
                <span className="absolute left-0 top-1/2 w-6 h-0.5 bg-gray-700 dark:bg-gray-200 rounded-full" />
                <span className="absolute left-0 top-1/2 translate-y-1.5 w-6 h-0.5 bg-gray-700 dark:bg-gray-200 rounded-full" />
              </span>
            </button>
          </Dialog.Trigger>
        </nav>
      </header>

      {/* Mobile Menu - Full Screen Dialog */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-0 z-50 bg-white dark:bg-black p-0">
          <div className="flex flex-col h-full">
            {/* Header with close button */}
            <div className="flex items-center justify-between px-4 sm:px-6 h-20 sm:h-24 border-b border-gray-200 dark:border-gray-700">
              <Image
                src="/Dark Blue.png"
                alt="Sameday Ramps logo"
                width={160}
                height={160}
                className="object-contain w-24 h-24 sm:w-28 sm:h-28"
                priority
              />
              <Dialog.Close asChild>
                <button
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 active:scale-95"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>

            {/* Navigation Content */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-8">
              <div className="max-w-md mx-auto w-full space-y-8">
                {/* Navigation Links */}
                <nav className="space-y-2">
                  {NAV_LINKS.map((link) => (
                    <Dialog.Close asChild key={link.name}>
                      <a
                        href={link.href}
                        aria-label={link.ariaLabel}
                        className="block w-full px-6 py-4 text-xl font-medium text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 text-center"
                      >
                        {link.name}
                      </a>
                    </Dialog.Close>
                  ))}
                </nav>

                {/* Action Buttons */}
                <div className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <Dialog.Close asChild>
                    <a
                      href="tel:9405369626"
                      aria-label="Call now (940) 536-9626"
                      className="flex items-center justify-center gap-3 w-full px-6 py-4 text-lg font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      (940) 536-9626
                    </a>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Link href="/#quote-form" passHref>
                      <button
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#eafc2b] hover:bg-[#dceb29] text-gray-900 font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#eafc2b] focus:ring-offset-2"
                        aria-label="Get a quote"
                      >
                        Get A Quote
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </Link>
                  </Dialog.Close>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Header; 