"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { Home, Users, Star } from "lucide-react";

const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

/** Background / side image for the section (construction, homes, etc.) */
const STATS_IMAGE = "/recurses/casas.jpg";

const stats = [
  {
    icon: Home,
    displayValue: "2,877",
    label: "Homes Built",
    description: "Quality homes delivered to families",
    accent: "#090040",
  },
  {
    icon: Users,
    displayValue: "2,877",
    label: "Happy Families",
    description: "Families living their American dream",
    accent: "#2d2c55",
  },
  {
    icon: Star,
    displayValue: "Pioneers",
    label: "Rent to Own",
    description: "Pioneers in the Rent to Own program",
    accent: "#D4AF37",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_SMOOTH },
  },
};

const statCardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 + i * 0.06, duration: 0.4, ease: EASE_SMOOTH },
  }),
};

const imageRevealVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
};

const fadeInOnMount = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: EASE_SMOOTH, staggerChildren: 0.06, delayChildren: 0.06 },
  },
};

const fadeInItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: EASE_SMOOTH } },
};

const Statistics = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[480px] lg:min-h-[640px]"
      aria-labelledby="our-impact-heading"
    >
      {/* Mobile: full-bleed background image with overlay */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src={STATS_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-[#090040]/75"
          aria-hidden
        />
      </div>

      {/* Desktop: two-column layout — image left, content right */}
      <motion.div
        className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[480px] lg:min-h-[640px]"
        initial="hidden"
        animate="visible"
        variants={fadeInOnMount}
      >
        {/* Image column (desktop only; hidden on mobile, we use background above) */}
        <motion.div
          variants={fadeInItem}
          className="relative hidden lg:block min-h-[320px] lg:min-h-full"
        >
          <Image
            src={STATS_IMAGE}
            alt="Our impact: quality homes and families"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1023px) 0px, 50vw"
            priority
          />
          <div
            className="absolute inset-0 bg-linear-to-r from-[#090040]/30 to-transparent pointer-events-none"
            aria-hidden
          />
        </motion.div>

        {/* Content column: header + stats (light bg on desktop so cards read well) */}
        <div className="relative z-10 flex flex-col justify-center px-4 min-[480px]:px-5 sm:px-6 lg:px-12 xl:px-16 py-16 lg:py-20 lg:bg-slate-50/98">
          <Container className="w-full max-w-none px-0">
            {/* Header */}
            <motion.div
              variants={fadeInOnMount}
              className="mb-6 sm:mb-10 md:mb-14 text-center lg:text-left"
            >
              <motion.span
                variants={fadeInItem}
                className="inline-flex items-center gap-2 sm:gap-3 text-[11px] font-semibold tracking-[0.2em] sm:tracking-[0.22em] uppercase text-[#D4AF37] mb-3 sm:mb-4"
              >
                <span className="w-5 sm:w-6 h-px bg-[#D4AF37]/50" />
                Our Impact
                <span className="w-5 sm:w-6 h-px bg-[#D4AF37]/50" />
              </motion.span>
              <motion.h2
                id="our-impact-heading"
                variants={fadeInItem}
                className={cn(
                  "text-xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-light leading-[1.2] tracking-tight",
                  "text-white lg:text-slate-900"
                )}
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Building Dreams, One Home at a Time
              </motion.h2>
              <motion.p
                variants={fadeInItem}
                className={cn(
                  "mt-2 sm:mt-4 text-xs sm:text-base max-w-md leading-relaxed",
                  "text-white/90 lg:text-slate-600 mx-auto lg:mx-0"
                )}
              >
                Our numbers speak for themselves
              </motion.p>
            </motion.div>

            {/* Stats cards: compact horizontal on mobile, full card from sm */}
            <motion.div
              variants={fadeInOnMount}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 lg:gap-6 max-w-4xl lg:max-w-none"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const isGold = stat.accent === "#D4AF37";
                const isLast = index === stats.length - 1;
                return (
                  <motion.article
                    key={stat.label}
                    variants={fadeInItem}
                    className={cn(
                      isLast && "col-span-2 sm:col-span-1",
                      "group relative flex rounded-xl sm:rounded-2xl overflow-hidden",
                      "bg-white/95 sm:bg-white backdrop-blur-sm",
                      "border border-white/20 sm:border-slate-100/80",
                      "shadow-[0_2px_12px_rgba(0,0,0,0.08)] sm:shadow-sm",
                      "hover:shadow-lg hover:border-slate-200/80 sm:hover:border-slate-200/80",
                      "transition-all duration-300 ease-out",
                      "active:scale-[0.99]",
                      "min-h-[72px] sm:min-h-0 sm:hover:-translate-y-1",
                      "flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 p-3 sm:p-5 md:p-6 lg:p-7"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute rounded-t-xl sm:rounded-t-2xl",
                        "left-0 top-0 bottom-0 w-1 sm:w-full sm:bottom-auto sm:top-0 sm:left-0 sm:right-0 sm:h-[3px]"
                      )}
                      style={{
                        background: `linear-gradient(180deg, ${stat.accent}, ${stat.accent}cc)`,
                      }}
                    />
                    <div
                      className={cn(
                        "shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 ml-1 sm:ml-0 sm:mb-4",
                        isGold && "group-hover:scale-105"
                      )}
                      style={{
                        background: `linear-gradient(135deg, ${stat.accent}18, ${stat.accent}08)`,
                        color: stat.accent,
                      }}
                    >
                      <Icon className="h-5 w-5 sm:h-5 sm:w-5" aria-hidden />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 sm:min-w-none text-center sm:text-left">
                      <div
                        className={cn(
                          "text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight sm:mb-1.5",
                          stat.displayValue === "Pioneers"
                            ? "font-serif"
                            : "font-numeric tabular-nums"
                        )}
                        style={{ color: stat.accent }}
                      >
                        {stat.displayValue}
                      </div>
                      <h3 className="text-[11px] sm:text-sm font-semibold tracking-wide text-slate-700 sm:text-slate-800 uppercase">
                        {stat.label}
                      </h3>
                      <p
                        className={cn(
                          "text-xs md:text-sm text-slate-500 leading-snug mt-auto pt-2",
                          isLast ? "block" : "hidden sm:block"
                        )}
                      >
                        {stat.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </Container>
        </div>
      </motion.div>
    </section>
  );
};

export { Statistics };
