"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export interface SplitContentProps {
  eyebrow?: string;
  headline: string;
  highlightedText?: string;
  description: string;
  features?: Array<{
    icon?: React.ReactNode;
    title: string;
    description?: string;
  }>;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  theme?: "dark" | "light";
  className?: string;
  useContainer?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

const imageRevealVariants = {
  hidden: { opacity: 0, scale: 1.1, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.2, ease: EASE_SMOOTH },
  },
};

const SplitContent = ({
  eyebrow,
  headline,
  highlightedText,
  description,
  features,
  ctaText,
  ctaHref = "/contact",
  secondaryCtaText,
  secondaryCtaHref,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  theme = "dark",
  className = "",
  useContainer = true,
}: SplitContentProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const isDark = theme === "dark";
  const isImageRight = imagePosition === "right";

  const content = (
    <div
      className={`
        grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]
        ${isImageRight ? "" : "lg:grid-flow-dense"}
      `}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`
          flex flex-col justify-center
          px-6 sm:px-8 lg:px-12 xl:px-16
          py-14 lg:py-20
          ${isImageRight ? "lg:pr-8" : "lg:pl-8 lg:col-start-2"}
        `}
      >
        {eyebrow && (
          <motion.div variants={fadeUpVariants} className="mb-4">
            <span
              className={`
                inline-flex items-center gap-3
                text-[11px] font-semibold tracking-[0.2em] uppercase
                ${isDark ? "text-[#D4AF37]" : "text-[#090040]"}
              `}
            >
              <span className="w-8 h-px bg-current opacity-50" />
              {eyebrow}
            </span>
          </motion.div>
        )}

        <motion.h2 variants={fadeUpVariants} className="mb-5">
          <span
            className={`
              block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight
              ${isDark ? "text-white" : "text-slate-900"}
            `}
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {headline}
          </span>
          {highlightedText && (
            <span
              className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight"
              style={{
                fontFamily: "var(--font-serif)",
                background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {highlightedText}
            </span>
          )}
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          className={`text-base sm:text-lg leading-relaxed max-w-lg ${isDark ? "text-white/70" : "text-slate-600"}`}
        >
          {description}
        </motion.p>

        {features && features.length > 0 && (
          <motion.ul variants={fadeUpVariants} className="mt-6 sm:mt-8 space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-4">
                {feature.icon ? (
                  <span
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isDark ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "bg-[#090040]/10 text-[#090040]"}`}
                  >
                    {feature.icon}
                  </span>
                ) : (
                  <span className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${isDark ? "bg-[#D4AF37]" : "bg-[#090040]"}`} />
                )}
                <div>
                  <h4 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{feature.title}</h4>
                  {feature.description && (
                    <p className={`mt-1 text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>
                      {feature.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </motion.ul>
        )}

        {(ctaText || secondaryCtaText) && (
          <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-4 mt-8">
            {ctaText && (
              <Button
                className={`
                  group relative overflow-hidden px-8 py-6 rounded-lg
                  text-sm font-semibold uppercase tracking-wider
                  ${isDark ? "bg-[#D4AF37] hover:bg-[#FFD700] text-[#090040]" : "bg-[#090040] hover:bg-[#2d2c55] text-white"}
                  transition-all duration-300
                `}
                asChild
              >
                <Link href={ctaHref} className="flex items-center gap-3">
                  <span className="relative z-10">{ctaText}</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
            {secondaryCtaText && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? "text-white/70 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
              >
                {secondaryCtaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        variants={imageRevealVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`
          relative overflow-hidden min-h-[360px] lg:min-h-full
          ${isImageRight ? "" : "lg:col-start-1 lg:row-start-1"}
        `}
      >
        <div
          className={`
            absolute z-10 pointer-events-none hidden lg:block
            ${isImageRight ? "top-8 left-0 right-8 bottom-8 border-l-2 border-t-2 border-b-2" : "top-8 left-8 right-0 bottom-8 border-r-2 border-t-2 border-b-2"}
            ${isDark ? "border-white/10" : "border-slate-200"}
          `}
        />
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {isDark && (
          <div
            className={`absolute inset-0 pointer-events-none ${isImageRight ? "bg-gradient-to-r from-[#090040]/50 to-transparent" : "bg-gradient-to-l from-[#090040]/50 to-transparent"}`}
          />
        )}
      </motion.div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden
        ${isDark ? "bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040]" : "bg-slate-50"}
        ${className}
      `}
    >
      {isDark && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
      {useContainer ? <Container className="relative z-10">{content}</Container> : content}
    </section>
  );
};

export { SplitContent };
