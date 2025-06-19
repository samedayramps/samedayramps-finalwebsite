"use client";
import React, { useState, useRef } from "react";
import { ChevronDown, Send } from "lucide-react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const LIBRARIES: ("places")[] = ["places"];

export default function EnhancedQuoteForm() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  const [status, setStatus] = useState('idle');
  const [urgency, setUrgency] = useState('STANDARD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
      urgency: urgency,
      notes: formData.get('notes') as string,
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

  const urgencyOptions = [
    {
      value: 'URGENT',
      label: 'Urgent (immediate need)',
      description: "We'll respond within 2 hours"
    },
    {
      value: 'STANDARD', 
      label: 'Standard (Within 3-5 days)',
      description: 'Most common timeline'
    },
    {
      value: 'FLEXIBLE',
      label: 'Flexible (Planning ahead)', 
      description: 'Take time to explore options'
    }
  ];

  const selectedOption = urgencyOptions.find(opt => opt.value === urgency);

  if (status === 'success') {
    return (
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h3 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h3>
            <p className="text-lg mt-4">Your quote request has been sent successfully. We will be in touch shortly.</p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                {urgency === 'URGENT' && "We understand your urgent need. Our team will prioritize your request and contact you within 2 hours."}
                {urgency === 'STANDARD' && "We'll have your quote ready within 24 hours."}
                {urgency === 'FLEXIBLE' && "We'll prepare a detailed quote and timeline options for your planning needs."}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get an Instant Quote
          </h2>
          <p className="text-xl text-gray-600">
            Fill out the form below, and we&apos;ll get back to you with a no-obligation quote right away.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input 
                    id="firstName" 
                    name="firstName" 
                    placeholder="John" 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input 
                    id="lastName" 
                    name="lastName" 
                    placeholder="Doe" 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="john.doe@example.com" 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    placeholder="(555) 123-4567" 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              {/* Installation Address */}
              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Installation Address</label>
                {isLoaded && !loadError ? (
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      autocompleteRef.current = autocomplete;
                    }}
                    onPlaceChanged={() => {
                      const place = autocompleteRef.current?.getPlace();
                      if (place) {
                        setAddress(place.formatted_address || '');
                      }
                    }}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: "us" },
                    }}
                  >
                    <input
                      id="address"
                      name="address"
                      placeholder="Enter your address"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </Autocomplete>
                ) : (
                  <input
                    id="address"
                    name="address"
                    placeholder={loadError ? "Could not load maps" : "Loading..."}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                  />
                )}
              </div>

              {/* Timeline/Urgency */}
              <div className="space-y-2">
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
                  Timeline Needed
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{selectedOption?.label}</div>
                      <div className="text-sm text-gray-500">{selectedOption?.description}</div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {urgencyOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setUrgency(option.value);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-3 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Urgency-specific messaging */}
                {urgency === 'URGENT' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800">
                      We understand urgent situations. Our team will prioritize your request and provide same-day installation when possible.
                    </p>
                  </div>
                )}
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Additional Details (Optional)
                </label>
                <textarea 
                  id="notes" 
                  name="notes" 
                  placeholder="Any specific requirements, measurements you have, mobility device type, or timeline details..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Help us provide the most accurate quote by sharing any relevant details about your needs.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button 
                  type="submit"
                  disabled={status === 'loading'} 
                  className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  {status === 'loading' ? 'Sending Your Request...' : 'Get My Free Quote'}
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* Trust signals */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-center gap-6 text-center">
                  <div>
                    <p className="text-sm font-bold text-gray-900">Fast Response</p>
                    <p className="text-xs text-gray-600">Usually within 2-4 hours</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">No Obligation</p>
                    <p className="text-xs text-gray-600">Free quotes, no pressure</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Privacy Protected</p>
                    <p className="text-xs text-gray-600">Your info stays secure</p>
                  </div>
                </div>
              </div>

              {status === 'error' && (
                <div className="flex justify-center mt-4">
                  <p className="text-red-600">Something went wrong. Please try again or call us at (940) 536-9626.</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 