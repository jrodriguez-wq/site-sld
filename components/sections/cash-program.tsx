"use client";

import { Container } from "@/components/ui/container";
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

const steps = [
  {
    number: "1",
    title: "Funds Deposited",
    description: "Lenders funds deposited into Escrow Account",
    duration: "Week 1",
    icon: Wallet,
  },
  {
    number: "2",
    title: "First Draw & Permit",
    description: "First draw to Construction. Permit application, lot clear, pad prep. Permit approved.",
    duration: "Week 1 - Month 2",
    icon: FileText,
  },
  {
    number: "3",
    title: "Vertical Construction",
    description: "2nd and 3rd draws at Block and Drywall/Stucco. Construction completed.",
    duration: "80 days",
    icon: Building2,
  },
  {
    number: "4",
    title: "CO & Finance",
    description: "Certificate of Occupancy. Finance Department takes over refinancing.",
    duration: "Month 5",
    icon: Briefcase,
  },
  {
    number: "5",
    title: "Title Refinancing",
    description: "Property refinanced by same title company.",
    duration: "End month 6",
    icon: Landmark,
  },
  {
    number: "6",
    title: "Lender Paid",
    description: "Lender receives $220k principal + $24.2k interest.",
    duration: "Month 6",
    icon: DollarSign,
  },
];

interface CashProgramProps {
  showCta?: boolean;
}

const CashProgram = ({ showCta = false }: CashProgramProps) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      id={showCta ? undefined : "cash-program"}
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-gray-900 relative scroll-mt-28"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16 md:mb-20">
          <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#090040] mb-4">
            The Journey
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            A streamlined construction financing process from start to finish
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            6 steps. 6 months. From funding to full repayment. Clear, transparent, proven.
          </p>
        </div>

        {/* Journey - 3 steps top, 3 steps bottom */}
        <div className="relative max-w-6xl mx-auto">
          {/* Row 1: Steps 1-3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {steps.slice(0, 3).map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index || (activeStep === null && index === 0);
              return (
                <div
                  key={step.number}
                  className="relative group"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div
                    className={`relative h-full bg-white rounded-2xl p-5 sm:p-6 border-2 transition-all duration-300 hover:-translate-y-1 ${
                      isActive
                        ? "border-[#090040] shadow-xl shadow-[#090040]/20"
                        : "border-slate-200 hover:border-[#090040]/40"
                    }`}
                  >
                    <div
                      className={`absolute -top-3 -left-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                        isActive ? "bg-[#090040] text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {step.number}
                    </div>
                    <div className="pt-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#090040]/10 to-[#090040]/5 mb-4">
                        <Icon className="h-6 w-6 text-[#090040]" aria-hidden="true" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[#090040] font-semibold text-xs">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {step.duration}
                      </div>
                    </div>
                  </div>
                  {index < 2 && (
                    <div className="hidden sm:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 text-slate-300">
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Connector: Step 3 → Step 4 */}
          <div className="hidden sm:flex justify-center my-6">
            <div className="flex flex-col items-center gap-1">
              <div className="h-4 w-px bg-gradient-to-b from-[#090040]/60 to-transparent" />
              <ChevronDown className="h-6 w-6 text-[#090040]/60 shrink-0" aria-hidden="true" />
              <div className="h-4 w-px bg-gradient-to-b from-transparent to-[#090040]/60" />
            </div>
          </div>

          {/* Row 2: Steps 4-6 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {steps.slice(3, 6).map((step, index) => {
              const actualIndex = index + 3;
              const Icon = step.icon;
              const isActive = activeStep === actualIndex;
              return (
                <div
                  key={step.number}
                  className="relative group"
                  onMouseEnter={() => setActiveStep(actualIndex)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div
                    className={`relative h-full bg-white rounded-2xl p-5 sm:p-6 border-2 transition-all duration-300 hover:-translate-y-1 ${
                      isActive
                        ? "border-[#090040] shadow-xl shadow-[#090040]/20"
                        : "border-slate-200 hover:border-[#090040]/40"
                    }`}
                  >
                    <div
                      className={`absolute -top-3 -left-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                        isActive ? "bg-[#090040] text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {step.number}
                    </div>
                    <div className="pt-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#090040]/10 to-[#090040]/5 mb-4">
                        <Icon className="h-6 w-6 text-[#090040]" aria-hidden="true" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[#090040] font-semibold text-xs">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {step.duration}
                      </div>
                    </div>
                  </div>
                  {index < 2 && (
                    <div className="hidden sm:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 text-slate-300">
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-slate-100 text-center hover:border-[#090040]/30 transition-all duration-300 hover:-translate-y-1 shadow-lg">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#090040] to-[#2d2c55] bg-clip-text text-transparent mb-2">
              6 Months
            </div>
            <div className="text-slate-900 font-semibold text-sm sm:text-base">
              Total Timeline
            </div>
            <div className="text-slate-600 text-xs sm:text-sm mt-1">
              From funding to repayment
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-slate-100 text-center hover:border-[#090040]/30 transition-all duration-300 hover:-translate-y-1 shadow-lg">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#090040] to-[#2d2c55] bg-clip-text text-transparent mb-2">
              $220k
            </div>
            <div className="text-slate-900 font-semibold text-sm sm:text-base">
              Principal Return
            </div>
            <div className="text-slate-600 text-xs sm:text-sm mt-1">
              Principal amount returned
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-slate-100 text-center hover:border-[#090040]/30 transition-all duration-300 hover:-translate-y-1 shadow-lg">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#090040] to-[#2d2c55] bg-clip-text text-transparent mb-2">
              $24.2k
            </div>
            <div className="text-slate-900 font-semibold text-sm sm:text-base">
              Interest Payment
            </div>
            <div className="text-slate-600 text-xs sm:text-sm mt-1">
              Interest for 6 months
            </div>
          </div>
        </div>

        {showCta && (
          <div className="mt-12 sm:mt-16 flex justify-center">
            <Link
              href="/investment"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#090040] text-white font-semibold text-base hover:bg-[#0a0044] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Learn More About Our Investment Program
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export { CashProgram };
