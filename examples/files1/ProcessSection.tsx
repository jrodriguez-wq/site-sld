"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Home, Key, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Types
interface ProcessStep {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
}

interface ProcessSectionProps {
  eyebrow?: string;
  headline: string;
  highlightedText?: string;
  description?: string;
  steps?: ProcessStep[];
  ctaText?: string;
  ctaHref?: string;
  theme?: "dark" | "light";
  className?: string;
}

// Default steps
const defaultSteps: ProcessStep[] = [
  {
    number: "01",
    icon: <FileText className="w-6 h-6" />,
    title: "Pre-Qualification",
    description: "Complete our simple application to see if you qualify for our $0 down program.",
    features: ["5-minute application", "No credit impact", "Instant response"],
  },
  {
    number: "02",
    icon: <Home className="w-6 h-6" />,
    title: "Choose Your Home",
    description: "Browse our available homes and floor plans. Find the perfect fit for your family.",
    features: ["Multiple floor plans", "Virtual tours available", "Customization options"],
  },
  {
    number: "03",
    icon: <Users className="w-6 h-6" />,
    title: "Meet Your Team",
    description: "Our dedicated team guides you through financing, design selections, and construction.",
    features: ["Personal advisor", "Transparent process", "Regular updates"],
  },
  {
    number: "04",
    icon: <Key className="w-6 h-6" />,
    title: "Move In",
    description: "Receive the keys to your new home. Welcome to the SLD family.",
    features: ["Final walkthrough", "10-year warranty", "Ongoing support"],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      delay: 0.8,
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ProcessSection = ({
  eyebrow = "The Process",
  headline = "Your Journey to",
  highlightedText = "Homeownership",
  description = "From application to keys in hand, we make the path to your dream home simple and transparent.",
  steps = defaultSteps,
  ctaText = "Start Your Journey",
  ctaHref = "/contact",
  theme = "dark",
  className = "",
}: ProcessSectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const isDark = theme === "dark";

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden py-24 sm:py-32
        ${isDark ? "bg-slate-950" : "bg-slate-50"}
        ${className}
      `}
    >
      {/* Background Elements */}
      {isDark && (
        <>
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUpVariants} className="mb-6">
            <span className={`
              inline-flex items-center gap-3
              text-[11px] font-semibold tracking-[0.25em] uppercase
              ${isDark ? "text-amber-400" : "text-amber-600"}
            `}>
              <span className="w-8 h-px bg-current opacity-50" />
              {eyebrow}
              <span className="w-8 h-px bg-current opacity-50" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2 variants={fadeUpVariants}>
            <span 
              className={`
                block text-3xl sm:text-4xl lg:text-5xl font-light leading-tight tracking-tight
                ${isDark ? "text-white" : "text-slate-900"}
              `}
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
          {description && (
            <motion.p 
              variants={fadeUpVariants}
              className={`
                mt-6 text-lg leading-relaxed max-w-2xl mx-auto
                ${isDark ? "text-white/60" : "text-slate-600"}
              `}
            >
              {description}
            </motion.p>
          )}
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`
              hidden lg:block absolute top-[60px] left-[calc(12.5%+40px)] right-[calc(12.5%+40px)] h-px
              ${isDark ? "bg-gradient-to-r from-white/10 via-amber-400/30 to-white/10" : "bg-gradient-to-r from-slate-200 via-amber-400/50 to-slate-200"}
            `}
            style={{ transformOrigin: "left" }}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                custom={index}
                variants={stepVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative group"
              >
                {/* Step Card */}
                <div className={`
                  relative p-6 sm:p-8 rounded-2xl transition-all duration-500
                  ${isDark 
                    ? "bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10" 
                    : "bg-white hover:shadow-xl border border-slate-100"
                  }
                `}>
                  {/* Step Number */}
                  <div className={`
                    relative z-10 w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center
                    transition-all duration-500
                    ${isDark 
                      ? "bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-400/20 group-hover:border-amber-400/40" 
                      : "bg-amber-50 border-2 border-amber-100 group-hover:border-amber-200"
                    }
                  `}>
                    <span 
                      className={`text-2xl font-light ${isDark ? "text-amber-400" : "text-amber-600"}`}
                      style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
                    >
                      {step.number}
                    </span>
                    {/* Icon overlay on hover */}
                    <div className={`
                      absolute inset-0 flex items-center justify-center rounded-full
                      opacity-0 group-hover:opacity-100 transition-all duration-300
                      ${isDark ? "bg-amber-500" : "bg-amber-400"}
                    `}>
                      <span className="text-slate-950">{step.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className={`
                      text-lg font-semibold mb-3
                      ${isDark ? "text-white" : "text-slate-900"}
                    `}>
                      {step.title}
                    </h3>
                    <p className={`
                      text-sm leading-relaxed mb-4
                      ${isDark ? "text-white/50" : "text-slate-500"}
                    `}>
                      {step.description}
                    </p>

                    {/* Features */}
                    {step.features && (
                      <ul className="space-y-2">
                        {step.features.map((feature, idx) => (
                          <li 
                            key={idx}
                            className={`
                              flex items-center justify-center gap-2 text-xs
                              ${isDark ? "text-white/40" : "text-slate-400"}
                            `}
                          >
                            <CheckCircle2 className={`w-3.5 h-3.5 ${isDark ? "text-emerald-400" : "text-emerald-500"}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Mobile Arrow (between cards) */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-4 sm:hidden">
                    <ArrowRight className={`w-5 h-5 rotate-90 ${isDark ? "text-white/20" : "text-slate-300"}`} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {ctaText && (
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mt-16"
          >
            <Button
              className={`
                group relative overflow-hidden px-10 py-7 rounded-none
                text-sm font-semibold uppercase tracking-wider
                ${isDark 
                  ? "bg-amber-500 hover:bg-amber-400 text-slate-950" 
                  : "bg-slate-900 hover:bg-slate-800 text-white"
                }
                transition-all duration-500
              `}
              asChild
            >
              <Link href={ctaHref} className="flex items-center gap-3">
                <span className="relative z-10">{ctaText}</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export { ProcessSection };
export type { ProcessSectionProps, ProcessStep };
