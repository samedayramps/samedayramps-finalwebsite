"use client";
import React, { useState, useRef } from "react";
import { Grid, Flex, Text, Heading, TextField, Button } from "@radix-ui/themes";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const LIBRARIES: ("places")[] = ["places"];

const QuoteForm: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [address, setAddress] = useState('');
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');

    const formData = new FormData(event.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: address,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <Heading as="h3" size="6">Thank You!</Heading>
        <Text as="p" size="4" className="mt-4">Your quote request has been sent successfully. We will be in touch shortly.</Text>
      </div>
    );
  }

  return (
    <section id="quote-form" className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Flex direction="column" align="center" gap="4" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Heading as="h2" size="8" weight="bold" className="text-gray-900 dark:text-white">
            Get an Instant Quote
          </Heading>
          <Text as="p" size="5" className="text-gray-600 dark:text-gray-400">
            Fill out the form below, and we&apos;ll get back to you with a no-obligation quote right away.
          </Text>
        </Flex>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="w-full">
            <Flex direction="column" gap="6">
              <Grid columns={{ initial: "1", sm: "2" }} gap="6" width="auto">
                {/* First Name */}
                <Flex direction="column" gap="2">
                  <Text as="label" htmlFor="firstName" size="3" className="text-gray-700 dark:text-gray-300 font-medium">First Name</Text>
                  <TextField.Root id="firstName" name="firstName" placeholder="John" required size="3" />
                </Flex>

                {/* Last Name */}
                <Flex direction="column" gap="2">
                  <Text as="label" htmlFor="lastName" size="3" className="text-gray-700 dark:text-gray-300 font-medium">Last Name</Text>
                  <TextField.Root id="lastName" name="lastName" placeholder="Doe" required size="3" />
                </Flex>

                {/* Email */}
                <Flex direction="column" gap="2">
                  <Text as="label" htmlFor="email" size="3" className="text-gray-700 dark:text-gray-300 font-medium">Email</Text>
                  <TextField.Root id="email" name="email" type="email" placeholder="john.doe@example.com" required size="3" />
                </Flex>

                {/* Phone */}
                <Flex direction="column" gap="2">
                  <Text as="label" htmlFor="phone" size="3" className="text-gray-700 dark:text-gray-300 font-medium">Phone</Text>
                  <TextField.Root id="phone" name="phone" type="tel" placeholder="(555) 123-4567" required size="3" />
                </Flex>
              </Grid>
              
              {/* Installation Address */}
              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="address" size="3" className="text-gray-700 dark:text-gray-300 font-medium">Installation Address</Text>
                {isLoaded && !loadError ? (
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      autocompleteRef.current = autocomplete;
                    }}
                    onPlaceChanged={() => {
                      if (autocompleteRef.current) {
                        const place = autocompleteRef.current.getPlace();
                        setAddress(place.formatted_address || '');
                      }
                    }}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: "us" },
                    }}
                  >
                    <TextField.Root 
                      id="address" 
                      name="address" 
                      placeholder="123 Main St, Anytown, USA" 
                      required 
                      size="3" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Autocomplete>
                ) : (
                  <TextField.Root placeholder={loadError ? "Could not load maps" : "Loading..."} disabled size="3" />
                )}
              </Flex>

              {/* Submit Button */}
              <Flex justify="center" className="mt-4">
                <Button size="3" type="submit" disabled={status === 'loading'} className="w-full sm:w-auto cursor-pointer font-bold text-gray-900">
                  {status === 'loading' ? 'Sending...' : 'Get A Quote'}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Flex>
              {status === 'error' && (
                <Flex justify="center" className="mt-4">
                  <Text color="red" size="3">Something went wrong. Please try again.</Text>
                </Flex>
              )}
            </Flex>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm; 