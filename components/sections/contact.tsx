"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CONTACT_INFO } from "@/config/contact";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaPaperPlane, FaExclamationCircle } from "react-icons/fa";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s\-\(\)\+]+$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    // Clear submit error
    if (submitError) {
      setSubmitError(null);
    }
  }, [errors, submitError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API endpoint or HubSpot integration
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : "An error occurred. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      content: CONTACT_INFO.address.street,
      subContent: `${CONTACT_INFO.address.city}, ${CONTACT_INFO.address.state} ${CONTACT_INFO.address.zip}`,
      href: CONTACT_INFO.address.googleMaps,
    },
    {
      icon: FaPhone,
      title: "Phone",
      content: CONTACT_INFO.phone.display,
      href: CONTACT_INFO.phone.href,
    },
    {
      icon: FaEnvelope,
      title: "Email",
      content: CONTACT_INFO.email.display,
      href: CONTACT_INFO.email.href,
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white text-slate-900 relative scroll-mt-28">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Intro Text */}
        <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 md:mb-20">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto">
            Ready to start your real estate journey? Contact us today to learn more about our services and how we can help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <p className="text-gray-600 mb-8 text-base sm:text-lg">
                Reach out to us through any of these channels
              </p>
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.title} className="flex items-start gap-4 group">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-slate-900 text-white transition-colors duration-200 group-hover:bg-slate-800">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg sm:text-xl mb-1">
                          {info.title}
                        </h4>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.title === "Location" ? "_blank" : undefined}
                            rel={info.title === "Location" ? "noopener noreferrer" : undefined}
                            className="text-gray-600 hover:text-[#090040] transition-colors duration-300 text-base sm:text-lg block"
                          >
                            {info.content}
                            {info.subContent && (
                              <span className="block text-gray-500 text-sm sm:text-base mt-1">
                                {info.subContent}
                              </span>
                            )}
                          </a>
                        ) : (
                          <div>
                            <p className="text-gray-600 text-base sm:text-lg">
                              {info.content}
                            </p>
                            {info.subContent && (
                              <p className="text-gray-500 text-sm sm:text-base">
                                {info.subContent}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Send Us a Message
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
              Fill out the form below and we&apos;ll get back to you as soon as possible
            </p>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in-0 zoom-in-95 duration-500">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white">
                  <FaCheckCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h4>
                <p className="text-gray-600 text-lg mb-4">
                  We&apos;ll get back to you soon.
                </p>
                <p className="text-sm text-gray-500">
                  You can also reach us directly at{" "}
                  <a
                    href={CONTACT_INFO.phone.href}
                    className="text-[#090040] hover:underline font-semibold"
                  >
                    {CONTACT_INFO.phone.display}
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
                {submitError && (
                  <div className="rounded-xl bg-red-50 border-2 border-red-200 p-4 flex items-start gap-3 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                    <FaExclamationCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-red-900 mb-1">Error</p>
                      <p className="text-sm text-red-700">{submitError}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm sm:text-base font-semibold mb-2 text-gray-900"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-[#090040] focus:ring-[#090040]/20"
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5">
                      <FaExclamationCircle className="h-3.5 w-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm sm:text-base font-semibold mb-2 text-gray-900"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-[#090040] focus:ring-[#090040]/20"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5">
                      <FaExclamationCircle className="h-3.5 w-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm sm:text-base font-semibold mb-2 text-gray-900"
                  >
                    Phone <span className="text-gray-500 font-normal text-xs">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.phone
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-[#090040] focus:ring-[#090040]/20"
                    }`}
                    placeholder={CONTACT_INFO.phone.display}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5">
                      <FaExclamationCircle className="h-3.5 w-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm sm:text-base font-semibold mb-2 text-gray-900"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                      errors.message
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-[#090040] focus:ring-[#090040]/20"
                    }`}
                    placeholder="Tell us about your project or inquiry..."
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5">
                      <FaExclamationCircle className="h-3.5 w-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold shadow-lg hover:shadow-md transition-colors duration-200 py-6 sm:py-7 text-base sm:text-lg rounded-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export { Contact };
