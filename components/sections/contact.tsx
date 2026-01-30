"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      content: "2721 Vista Parkway",
      subContent: "West Palm Beach, FL 33411",
      href: "#",
    },
    {
      icon: FaPhone,
      title: "Phone",
      content: "(123) 456-7890",
      href: "tel:+1234567890",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      content: "info@sld.com",
      href: "mailto:info@sld.com",
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white text-gray-900 relative overflow-hidden scroll-mt-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #471396 1px, transparent 0)`,
            backgroundSize: "40px 40px",
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
            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-lg">
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
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg sm:text-xl mb-1">
                          {info.title}
                        </h4>
                        {info.href !== "#" ? (
                          <a
                            href={info.href}
                            className="text-gray-600 hover:text-[#471396] transition-colors duration-300 text-base sm:text-lg block"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <div>
                            <p className="text-gray-600 text-base sm:text-lg">
                              {info.content}
                            </p>
                            <p className="text-gray-500 text-sm sm:text-base">
                              {info.subContent}
                            </p>
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
          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Send Us a Message
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
              Fill out the form below and we&apos;ll get back to you as soon as possible
            </p>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B]">
                  <FaCheckCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h4>
                <p className="text-gray-600 text-lg">
                  We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#471396] focus:outline-none focus:ring-2 focus:ring-[#471396]/20 transition-all duration-300"
                    placeholder="Your full name"
                  />
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
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#471396] focus:outline-none focus:ring-2 focus:ring-[#471396]/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm sm:text-base font-semibold mb-2 text-gray-900"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#471396] focus:outline-none focus:ring-2 focus:ring-[#471396]/20 transition-all duration-300"
                    placeholder="(123) 456-7890"
                  />
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
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#471396] focus:outline-none focus:ring-2 focus:ring-[#471396]/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 py-6 sm:py-7 text-base sm:text-lg rounded-xl"
                >
                  {isSubmitting ? (
                    "Sending..."
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
