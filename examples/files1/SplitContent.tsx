"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
interface SplitContentProps {
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

const imageRevealVariants = {
  hidden: { 
    opacity: 0, 
    scale: 1.1,
    clipPath: "inset(0 100% 0 0)" 
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
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
}: SplitContentProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const isDark = theme === "dark";
  const isImageRight = imagePosition === "right";

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden
        ${isDark ? "bg-slate-950" : "bg-slate-50"}
        ${className}
      `}
    >
      {/* Subtle Background Texture */}
      {isDark && (
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <div className="relative max-w-[1600px] mx-auto">
        <div className={`
          grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]
          ${isImageRight ? "" : "lg:grid-flow-dense"}
        `}>
          
          {/* Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`
              flex flex-col justify-center
              px-6 sm:px-12 lg:px-16 xl:px-24
              py-16 lg:py-24
              ${isImageRight ? "lg:pr-12" : "lg:pl-12 lg:col-start-2"}
            `}
          >
            {/* Eyebrow */}
            {eyebrow && (
              <motion.div variants={fadeUpVariants} className="mb-6">
                <span className={`
                  inline-flex items-center gap-3
                  text-[11px] font-semibold tracking-[0.25em] uppercase
                  ${isDark ? "text-amber-400" : "text-amber-600"}
                `}>
                  <span className="w-8 h-px bg-current opacity-50" />
                  {eyebrow}
                </span>
              </motion.div>
            )}

            {/* Headline */}
            <motion.h2 
              variants={fadeUpVariants}
              className="mb-6"
            >
              <span 
                className={`
                  block text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight
                  ${isDark ? "text-white" : "text-slate-900"}
                `}
                style={{ fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)" }}
              >
                {headline}
              </span>
              {highlightedText && (
                <span 
                  className="block mt-2 text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight"
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
              className={`
                text-base sm:text-lg leading-relaxed max-w-lg
                ${isDark ? "text-white/60" : "text-slate-600"}
              `}
            >
              {description}
            </motion.p>

            {/* Features List */}
            {features && features.length > 0 && (
              <motion.ul 
                variants={fadeUpVariants}
                className="mt-8 space-y-4"
              >
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    {feature.icon ? (
                      <span className={`
                        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                        ${isDark 
                          ? "bg-amber-500/10 text-amber-400" 
                          : "bg-amber-100 text-amber-600"
                        }
                      `}>
                        {feature.icon}
                      </span>
                    ) : (
                      <span className={`
                        flex-shrink-0 w-2 h-2 mt-2 rounded-full
                        ${isDark ? "bg-amber-400" : "bg-amber-500"}
                      `} />
                    )}
                    <div>
                      <h4 className={`
                        font-semibold
                        ${isDark ? "text-white" : "text-slate-900"}
                      `}>
                        {feature.title}
                      </h4>
                      {feature.description && (
                        <p className={`
                          mt-1 text-sm
                          ${isDark ? "text-white/50" : "text-slate-500"}
                        `}>
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </motion.ul>
            )}

            {/* CTAs */}
            {(ctaText || secondaryCtaText) && (
              <motion.div 
                variants={fadeUpVariants}
                className="flex flex-wrap items-center gap-4 mt-10"
              >
                {ctaText && (
                  <Button
                    className={`
                      group relative overflow-hidden
                      px-8 py-6 rounded-none
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
                )}
                {secondaryCtaText && secondaryCtaHref && (
                  <Link 
                    href={secondaryCtaHref}
                    className={`
                      inline-flex items-center gap-2 
                      text-sm font-medium
                      ${isDark 
                        ? "text-white/70 hover:text-white" 
                        : "text-slate-600 hover:text-slate-900"
                      }
                      transition-colors duration-300
                    `}
                  >
                    {secondaryCtaText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Image Side */}
          <motion.div
            variants={imageRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`
              relative overflow-hidden
              min-h-[400px] lg:min-h-full
              ${isImageRight ? "" : "lg:col-start-1 lg:row-start-1"}
            `}
          >
            {/* Decorative Frame */}
            <div className={`
              absolute z-10 pointer-events-none
              ${isImageRight 
                ? "top-8 left-0 right-8 bottom-8 border-l-2 border-t-2 border-b-2" 
                : "top-8 left-8 right-0 bottom-8 border-r-2 border-t-2 border-b-2"
              }
              ${isDark ? "border-white/10" : "border-slate-200"}
              hidden lg:block
            `} />
            
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            
            {/* Gradient Overlay for Text Legibility */}
            <div className={`
              absolute inset-0
              ${isImageRight 
                ? "bg-gradient-to-r from-slate-950/40 to-transparent" 
                : "bg-gradient-to-l from-slate-950/40 to-transparent"
              }
              ${isDark ? "opacity-100" : "opacity-0"}
            `} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { SplitContent };
export type { SplitContentProps };

/* 
USAGE EXAMPLE:
─────────────

<SplitContent
  eyebrow="About Us"
  headline="Building Dreams"
  highlightedText="Since 2016"
  description="We've helped over 2,800 families achieve homeownership with our revolutionary $0 down payment program. Our commitment to quality construction and customer satisfaction sets us apart."
  features={[
    { 
      title: "$0 Down Payment", 
      description: "Start your journey to homeownership without the burden of a large down payment." 
    },
    { 
      title: "Quality Construction", 
      description: "Every home is built with premium materials and meticulous attention to detail." 
    },
    { 
      title: "10-Year Warranty", 
      description: "Peace of mind with our comprehensive structural warranty." 
    },
  ]}
  ctaText="Get Started"
  ctaHref="/contact"
  secondaryCtaText="View Our Homes"
  secondaryCtaHref="/portfolio"
  imageSrc="/images/about-home.jpg"
  imageAlt="Beautiful SLD home exterior"
  imagePosition="right"
  theme="dark"
/>

*/
