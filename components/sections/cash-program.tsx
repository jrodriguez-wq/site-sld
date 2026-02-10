"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Wallet,
  FileText,
  Building2,
  Briefcase,
  Landmark,
  DollarSign,
  ChevronRight,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { AnimatedSection } from "@/components/ui/animated-section";

const steps = [
  { number: "1", title: "Funds Deposited", description: "Lenders funds deposited into Escrow Account", duration: "Week 1", icon: Wallet },
  { number: "2", title: "First Draw & Permit", description: "First draw to Construction. Permit application, lot clear, pad prep. Permit approved.", duration: "Week 1 - Month 2", icon: FileText },
  { number: "3", title: "Vertical Construction", description: "2nd and 3rd draws at Block and Drywall/Stucco. Construction completed.", duration: "80 days", icon: Building2 },
  { number: "4", title: "CO & Finance", description: "Certificate of Occupancy. Finance Department takes over refinancing.", duration: "Month 5", icon: Briefcase },
  { number: "5", title: "Title Refinancing", description: "Property refinanced by same title company.", duration: "End month 6", icon: Landmark },
  { number: "6", title: "Lender Paid", description: "Lender receives $220k principal + $24.2k interest.", duration: "Month 6", icon: DollarSign },
];

const summaryCards = [
  { value: "6 Months", label: "Total Timeline", sub: "From funding to repayment" },
  { value: "$220k", label: "Principal Return", sub: "Principal amount returned" },
  { value: "$24.2k", label: "Interest Payment", sub: "Interest for 6 months" },
];

interface StepCardProps {
  step: (typeof steps)[0];
  isActive: boolean;
  onFocus: () => void;
  onBlur: () => void;
  showArrow?: boolean;
}

const StepCard = ({ step, isActive, onFocus, onBlur, showArrow = false }: StepCardProps) => {
  const Icon = step.icon;
  return (
    <article
      className="relative cursor-pointer"
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      onClick={onFocus}
      onFocus={onFocus}
      onBlur={onBlur}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFocus();
        }
      }}
      aria-pressed={isActive}
      aria-label={`Step ${step.number}: ${step.title}. ${step.duration}.`}
    >
      <div
        className={`relative h-full rounded-xl sm:rounded-2xl border-2 p-4 sm:p-5 md:p-6 bg-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99] ${
          isActive ? "border-[#090040] shadow-lg shadow-[#090040]/15" : "border-slate-200 hover:border-[#090040]/40"
        }`}
      >
        <span
          className={`absolute -top-2.5 left-3 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs sm:text-sm font-bold tabular-nums transition-colors ${
            isActive ? "bg-[#090040] text-white" : "bg-slate-200 text-slate-600"
          }`}
          aria-hidden
        >
          {step.number}
        </span>
        <div className="pt-1 sm:pt-2">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-[#090040]/10 mb-3 sm:mb-4">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#090040]" aria-hidden />
          </div>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 mb-1.5 sm:mb-2 line-clamp-2">
            {step.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-snug line-clamp-3 sm:line-clamp-none mb-3 sm:mb-4">
            {step.description}
          </p>
          <span className="inline-flex items-center gap-1.5 text-[#090040] font-semibold text-[11px] sm:text-xs">
            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
            {step.duration}
          </span>
        </div>
      </div>
      {showArrow && (
        <div className="hidden sm:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
        </div>
      )}
    </article>
  );
};

interface CashProgramProps {
  showCta?: boolean;
}

const CashProgram = ({ showCta = false }: CashProgramProps) => {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <section
      id={showCta ? undefined : "cash-program"}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 text-slate-900 scroll-mt-20 sm:scroll-mt-24"
      aria-labelledby="cash-program-heading"
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <AnimatedSection className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#090040] mb-3 sm:mb-4">
            The Journey
          </span>
          <h2
            id="cash-program-heading"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-4 px-1"
          >
            A streamlined construction financing process from start to finish
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-1">
            6 steps. 6 months. From funding to full repayment. Clear, transparent, proven.
          </p>
        </AnimatedSection>

        <div className="relative max-w-6xl mx-auto">
          {/* Row 1: Steps 1–3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6">
            {steps.slice(0, 3).map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                isActive={activeStep === index || (activeStep === null && index === 0)}
                onFocus={() => setActiveStep(index)}
                onBlur={() => setActiveStep(null)}
                showArrow={index < 2}
              />
            ))}
          </div>

          {/* Connector */}
          <div className="flex justify-center my-4 sm:my-6">
            <div className="flex flex-col items-center gap-0.5">
              <div className="h-3 sm:h-4 w-px bg-[#090040]/40" />
              <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-[#090040]/60 shrink-0" aria-hidden />
              <div className="h-3 sm:h-4 w-px bg-[#090040]/40" />
            </div>
          </div>

          {/* Row 2: Steps 4–6 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {steps.slice(3, 6).map((step, index) => {
              const actualIndex = index + 3;
              return (
                <StepCard
                  key={step.number}
                  step={step}
                  isActive={activeStep === actualIndex}
                  onFocus={() => setActiveStep(actualIndex)}
                  onBlur={() => setActiveStep(null)}
                  showArrow={index < 2}
                />
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <AnimatedSection.Stagger
          className="mt-10 sm:mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          rootMargin="0px 0px -40px 0px"
        >
          {summaryCards.map((card) => (
            <article
              key={card.label}
              className="rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 bg-white border-2 border-slate-100 text-center hover:border-[#090040]/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99] shadow-md"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#090040] to-[#2d2c55] bg-clip-text text-transparent mb-1 sm:mb-2 tabular-nums">
                {card.value}
              </div>
              <h3 className="text-slate-900 font-semibold text-sm sm:text-base">
                {card.label}
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs md:text-sm mt-0.5 sm:mt-1">
                {card.sub}
              </p>
            </article>
          ))}
        </AnimatedSection.Stagger>

        {showCta && (
          <div className="mt-10 sm:mt-14 flex justify-center">
            <Link
              href="/investment"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-[#090040] text-white font-semibold text-sm sm:text-base hover:bg-[#0a0044] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] touch-manipulation"
              aria-label="Learn more about our investment program"
            >
              Learn More About Our Investment Program
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export { CashProgram };
