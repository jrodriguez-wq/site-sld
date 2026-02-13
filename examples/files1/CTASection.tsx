"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
interface CTASectionProps {
  eyebrow?: string;
  headline: string;
  highlightedText?: string;
  description?: string;
  benefits?: string[];
  showForm?: boolean;
  showContactInfo?: boolean;
  backgroundImage?: string;
  theme?: "dark" | "gradient";
  className?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const CTASection = ({
  eyebrow = "Start Today",
  headline = "Ready to Build Your",
  highlightedText = "Dream Home?",
  description = "Take the first step toward homeownership. Our team is ready to guide you through every step of the journey.",
  benefits = [
    "$0 down payment required",
    "Pre-qualification in 5 minutes",
    "Dedicated personal advisor",
    "Transparent process",
  ],
  showForm = true,
  showContactInfo = true,
  backgroundImage,
  theme = "gradient",
  className = "",
}: CTASectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const isGradient = theme === "gradient";

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden py-24 sm:py-32
        ${isGradient 
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
          : "bg-slate-950"
        }
        ${className}
      `}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Noise */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUpVariants} className="mb-6">
              <span className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-400">
                <span className="w-8 h-px bg-amber-400/50" />
                {eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2 variants={fadeUpVariants}>
              <span 
                className="block text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)" }}
              >
                {headline}
              </span>
              {highlightedText && (
                <span 
                  className="block mt-1 text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight"
                  style={{ 
                    fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                    background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {highlightedText}
                </span>
              )}
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={fadeUpVariants}
              className="mt-6 text-lg text-white/60 leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Benefits */}
            {benefits && benefits.length > 0 && (
              <motion.ul variants={fadeUpVariants} className="mt-8 space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            {/* Contact Info */}
            {showContactInfo && (
              <motion.div variants={fadeUpVariants} className="mt-10 pt-10 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <a 
                    href="tel:+1234567890"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      <Phone className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Call Us</p>
                      <p className="text-white font-medium group-hover:text-amber-400 transition-colors">(123) 456-7890</p>
                    </div>
                  </a>
                  <a 
                    href="mailto:hello@sld.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      <Mail className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Email Us</p>
                      <p className="text-white font-medium group-hover:text-amber-400 transition-colors">hello@sld.com</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Visit Us</p>
                      <p className="text-white font-medium">Tampa, Florida</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Hours</p>
                      <p className="text-white font-medium">Mon-Fri: 9am - 6pm</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Form Side */}
          {showForm && (
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="relative p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">Get Started Today</h3>
                  <p className="text-white/50 text-sm">Fill out the form and we'll be in touch within 24 hours.</p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">Thank You!</h4>
                    <p className="text-white/60">We've received your inquiry and will contact you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all"
                        placeholder="John Smith"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all"
                        placeholder="(123) 456-7890"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all resize-none"
                        placeholder="Tell us about your dream home..."
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-6 text-sm tracking-wider uppercase rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Submit Inquiry
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>

                    {/* Privacy Note */}
                    <p className="text-center text-xs text-white/40">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy" className="text-amber-400 hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export { CTASection };
export type { CTASectionProps };
