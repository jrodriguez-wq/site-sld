"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Home, Users, Award, Clock, TrendingUp, Shield } from "lucide-react";

// Types
interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

interface StatsSectionProps {
  eyebrow?: string;
  headline?: string;
  highlightedText?: string;
  stats?: Stat[];
  layout?: "grid" | "horizontal";
  theme?: "dark" | "light" | "gradient";
  className?: string;
}

// Default stats
const defaultStats: Stat[] = [
  {
    icon: <Home className="w-6 h-6" />,
    value: 2877,
    label: "Homes Built",
    description: "Since 2016",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: 2877,
    label: "Happy Families",
    description: "And counting",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: 0,
    prefix: "$",
    label: "Down Payment",
    description: "Required to start",
  },
  {
    icon: <Award className="w-6 h-6" />,
    value: 100,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "Client happiness",
  },
];

// Animated counter component
const AnimatedCounter = ({ 
  value, 
  prefix = "", 
  suffix = "",
  duration = 2 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string;
  duration?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endValue = value;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeProgress * endValue);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

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

const statVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const StatsSection = ({
  eyebrow,
  headline,
  highlightedText,
  stats = defaultStats,
  layout = "grid",
  theme = "gradient",
  className = "",
}: StatsSectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const isDark = theme === "dark";
  const isGradient = theme === "gradient";
  const isHorizontal = layout === "horizontal";

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden py-20 sm:py-24
        ${isGradient 
          ? "bg-gradient-to-br from-amber-500 via-amber-500 to-amber-600" 
          : isDark 
            ? "bg-slate-950" 
            : "bg-slate-50"
        }
        ${className}
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {isGradient && (
          <>
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/50 to-amber-600" />
          </>
        )}
        {!isGradient && (
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        {(eyebrow || headline) && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-12 sm:mb-16"
          >
            {eyebrow && (
              <motion.div variants={fadeUpVariants} className="mb-4">
                <span className={`
                  inline-flex items-center gap-3
                  text-[11px] font-semibold tracking-[0.25em] uppercase
                  ${isGradient ? "text-slate-900/60" : isDark ? "text-amber-400" : "text-amber-600"}
                `}>
                  <span className="w-8 h-px bg-current opacity-50" />
                  {eyebrow}
                  <span className="w-8 h-px bg-current opacity-50" />
                </span>
              </motion.div>
            )}

            {headline && (
              <motion.h2 variants={fadeUpVariants}>
                <span 
                  className={`
                    block text-3xl sm:text-4xl lg:text-5xl font-light leading-tight tracking-tight
                    ${isGradient ? "text-slate-900" : isDark ? "text-white" : "text-slate-900"}
                  `}
                  style={{ fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)" }}
                >
                  {headline}
                </span>
                {highlightedText && (
                  <span 
                    className={`
                      block mt-1 text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight
                      ${isGradient ? "text-white" : ""}
                    `}
                    style={{ 
                      fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                      ...(!isGradient && {
                        background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      })
                    }}
                  >
                    {highlightedText}
                  </span>
                )}
              </motion.h2>
            )}
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`
            grid gap-6 sm:gap-8
            ${isHorizontal 
              ? "grid-cols-2 lg:grid-cols-4" 
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }
          `}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              custom={index}
              variants={statVariants}
              className={`
                group relative p-6 sm:p-8 rounded-2xl text-center
                transition-all duration-500
                ${isGradient 
                  ? "bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20" 
                  : isDark 
                    ? "bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10" 
                    : "bg-white hover:shadow-xl border border-slate-100"
                }
              `}
            >
              {/* Icon */}
              <div className={`
                w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center
                transition-all duration-500
                ${isGradient 
                  ? "bg-white/20 text-white group-hover:bg-white/30" 
                  : isDark 
                    ? "bg-amber-500/10 text-amber-400 border border-amber-400/20 group-hover:bg-amber-500/20" 
                    : "bg-amber-50 text-amber-600 group-hover:bg-amber-100"
                }
              `}>
                {stat.icon}
              </div>

              {/* Value */}
              <div 
                className={`
                  text-4xl sm:text-5xl font-light tracking-tight mb-2
                  ${isGradient ? "text-white" : isDark ? "text-white" : "text-slate-900"}
                `}
                style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
              >
                <AnimatedCounter 
                  value={stat.value} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>

              {/* Label */}
              <div className={`
                text-sm font-semibold tracking-wide uppercase mb-1
                ${isGradient ? "text-white" : isDark ? "text-white" : "text-slate-900"}
              `}>
                {stat.label}
              </div>

              {/* Description */}
              {stat.description && (
                <div className={`
                  text-xs
                  ${isGradient ? "text-white/60" : isDark ? "text-white/40" : "text-slate-500"}
                `}>
                  {stat.description}
                </div>
              )}

              {/* Decorative corner */}
              <div className={`
                absolute top-4 right-4 w-8 h-8 border-t border-r
                opacity-0 group-hover:opacity-100 transition-opacity duration-500
                ${isGradient ? "border-white/30" : isDark ? "border-amber-400/30" : "border-amber-200"}
              `} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { StatsSection };
export type { StatsSectionProps, Stat };
