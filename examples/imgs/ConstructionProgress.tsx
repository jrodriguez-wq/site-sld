"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Circle, Clock, Calendar } from "lucide-react";

// Types
interface ProgressPhase {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "completed" | "in-progress" | "upcoming";
  image?: string;
  progress?: number; // 0-100 for in-progress phases
}

interface ConstructionProgressProps {
  projectName: string;
  eyebrow?: string;
  headline?: string;
  highlightedText?: string;
  description?: string;
  phases: ProgressPhase[];
  overallProgress?: number;
  expectedCompletion?: string;
  theme?: "dark" | "light";
  className?: string;
}

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const ConstructionProgress = ({
  projectName,
  eyebrow = "Construction Progress",
  headline = "Building Your",
  highlightedText = "Dream Home",
  description,
  phases,
  overallProgress,
  expectedCompletion,
  theme = "dark",
  className = "",
}: ConstructionProgressProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activePhase, setActivePhase] = useState<string | null>(
    phases.find(p => p.status === "in-progress")?.id || phases[0]?.id
  );

  const isDark = theme === "dark";

  // Calculate overall progress if not provided
  const calculatedProgress = overallProgress ?? Math.round(
    (phases.filter(p => p.status === "completed").length / phases.length) * 100
  );

  const activePhaseData = phases.find(p => p.id === activePhase);

  const getStatusIcon = (status: ProgressPhase["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-emerald-400" />;
      case "in-progress":
        return (
          <div className="relative">
            <Circle className="w-6 h-6 text-amber-400" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
          </div>
        );
      case "upcoming":
        return <Circle className="w-6 h-6 text-white/30" />;
    }
  };

  const getStatusColor = (status: ProgressPhase["status"]) => {
    switch (status) {
      case "completed":
        return "border-emerald-400 bg-emerald-400/10";
      case "in-progress":
        return "border-amber-400 bg-amber-400/10";
      case "upcoming":
        return "border-white/20 bg-white/5";
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden py-24 sm:py-32
        ${isDark ? "bg-slate-950" : "bg-slate-50"}
        ${className}
      `}
    >
      {/* Background */}
      {isDark && (
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <span className={`
            inline-flex items-center gap-3 mb-4
            text-[11px] font-semibold tracking-[0.25em] uppercase
            ${isDark ? "text-amber-400" : "text-amber-600"}
          `}>
            <span className="w-8 h-px bg-current opacity-50" />
            {eyebrow}
            <span className="w-8 h-px bg-current opacity-50" />
          </span>
          <h2>
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
                }}
              >
                {highlightedText}
              </span>
            )}
          </h2>
          {description && (
            <p className={`mt-4 text-lg max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              {description}
            </p>
          )}
        </motion.div>

        {/* Overall Progress Bar */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`
            p-6 rounded-2xl mb-12
            ${isDark ? "bg-white/[0.03] border border-white/5" : "bg-white border border-slate-100"}
          `}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                {projectName}
              </h3>
              <p className={`text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>
                Overall Construction Progress
              </p>
            </div>
            <div className="flex items-center gap-6">
              {expectedCompletion && (
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${isDark ? "text-amber-400" : "text-amber-500"}`} />
                  <span className={`text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
                    Est. Completion: {expectedCompletion}
                  </span>
                </div>
              )}
              <span 
                className="text-3xl font-light"
                style={{ 
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {calculatedProgress}%
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className={`h-3 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-slate-100"}`}>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${calculatedProgress}%` } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
            />
          </div>
        </motion.div>

        {/* Timeline & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Vertical Line */}
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={`
                absolute left-[15px] top-0 bottom-0 w-px origin-top
                ${isDark ? "bg-white/10" : "bg-slate-200"}
              `}
            />

            {/* Phases */}
            <div className="space-y-6">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`
                    relative pl-12 cursor-pointer transition-all
                    ${activePhase === phase.id ? "opacity-100" : "opacity-60 hover:opacity-80"}
                  `}
                  onClick={() => setActivePhase(phase.id)}
                >
                  {/* Icon */}
                  <div className={`
                    absolute left-0 top-0 w-[30px] h-[30px] rounded-full flex items-center justify-center
                    ${getStatusColor(phase.status)}
                    border-2 transition-all
                    ${activePhase === phase.id ? "scale-110" : ""}
                  `}>
                    {getStatusIcon(phase.status)}
                  </div>

                  {/* Content */}
                  <div className={`
                    p-4 rounded-xl transition-all
                    ${activePhase === phase.id 
                      ? isDark 
                        ? "bg-white/[0.05] border border-amber-400/20" 
                        : "bg-white shadow-lg border border-amber-100"
                      : ""
                    }
                  `}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                          {phase.title}
                        </h4>
                        <p className={`text-sm mt-1 ${isDark ? "text-white/50" : "text-slate-500"}`}>
                          {phase.description}
                        </p>
                      </div>
                      <span className={`
                        flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium
                        ${phase.status === "completed" 
                          ? "bg-emerald-500/20 text-emerald-400" 
                          : phase.status === "in-progress"
                            ? "bg-amber-500/20 text-amber-400"
                            : isDark ? "bg-white/10 text-white/50" : "bg-slate-100 text-slate-500"
                        }
                      `}>
                        {phase.status === "completed" ? "Completed" : phase.status === "in-progress" ? "In Progress" : "Upcoming"}
                      </span>
                    </div>

                    {/* Date & Progress */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${isDark ? "text-white/40" : "text-slate-400"}`} />
                        <span className={`text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}>
                          {phase.date}
                        </span>
                      </div>
                      {phase.status === "in-progress" && phase.progress !== undefined && (
                        <div className="flex items-center gap-2 flex-1">
                          <div className={`flex-1 h-1.5 rounded-full ${isDark ? "bg-white/10" : "bg-slate-100"}`}>
                            <div 
                              className="h-full rounded-full bg-amber-400"
                              style={{ width: `${phase.progress}%` }}
                            />
                          </div>
                          <span className={`text-xs ${isDark ? "text-amber-400" : "text-amber-500"}`}>
                            {phase.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Active Phase Image */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {activePhaseData?.image ? (
              <div className="sticky top-8">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={activePhaseData.image}
                    alt={activePhaseData.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className={`
                      inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3
                      ${activePhaseData.status === "completed" 
                        ? "bg-emerald-500 text-white" 
                        : "bg-amber-500 text-slate-950"
                      }
                    `}>
                      {activePhaseData.status === "completed" ? "✓ Completed" : "● In Progress"}
                    </span>
                    <h3 className="text-xl font-semibold text-white">
                      {activePhaseData.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-1">
                      {activePhaseData.date}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`
                aspect-[4/3] rounded-2xl flex items-center justify-center
                ${isDark ? "bg-white/[0.03] border border-white/5" : "bg-slate-100"}
              `}>
                <p className={`text-center ${isDark ? "text-white/40" : "text-slate-400"}`}>
                  Select a phase to view progress photos
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { ConstructionProgress };
export type { ConstructionProgressProps, ProgressPhase };
