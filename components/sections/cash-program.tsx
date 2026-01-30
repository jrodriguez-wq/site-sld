"use client";

import { Container } from "@/components/ui/container";
import { useState } from "react";
import { Clock, Wallet, FileText, CheckCircle2, Building2, Home, FileCheck, Briefcase, Landmark, DollarSign } from "lucide-react";

const CashProgram = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      number: "1",
      title: "Lenders Funds Deposited",
      description: "Lenders funds are deposited into Escrow Account",
      duration: "Week 1",
      icon: Wallet,
    },
    {
      number: "2",
      title: "First Draw Dispersed",
      description:
        "First draw is dispersed to Construction account (Week 1). First draw funds new start - Permit application, Lot Clear, Pad Dirt Fill, pre-order Trusses, Windows, etc.",
      duration: "Week 1",
      icon: FileText,
    },
    {
      number: "3",
      title: "Permit Received",
      description: "Permit received and approved",
      duration: "Months 2-5",
      icon: CheckCircle2,
    },
    {
      number: "4",
      title: "Vertical Construction Starts",
      description:
        "Vertical construction begins. During this period 2nd and 3rd draws are released at 'Block' and 'Drywall/Stucco' stages.",
      duration: "80 days",
      icon: Building2,
    },
    {
      number: "5",
      title: "Construction Finished",
      description: "Construction completed and ready for final inspection",
      duration: "Months 4-5",
      icon: Home,
    },
    {
      number: "6",
      title: "CO Process",
      description: "Certificate of Occupancy process begins",
      duration: "Month 5",
      icon: FileCheck,
    },
    {
      number: "7",
      title: "Finance Department Takes Over",
      description:
        "Finance Department takes over the project with the refinancing process.",
      duration: "End of month 5",
      icon: Briefcase,
    },
    {
      number: "8",
      title: "Title Company Refinancing",
      description:
        "Property is refinanced by the same title company who did the construction draws",
      duration: "End of month 6",
      icon: Landmark,
    },
    {
      number: "9",
      title: "Lender Paid",
      description: "Lender is paid $200k plus $22k for the interest.",
      duration: "Month 6",
      icon: DollarSign,
    },
  ];

  return (
    <section id="cash-program" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white text-gray-900 relative overflow-hidden scroll-mt-28">
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
            A streamlined construction financing process from start to finish
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#471396] via-[#471396]/50 to-[#471396] hidden md:block" />
          
          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative flex gap-6 sm:gap-8 items-start group"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Step Number Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-4 transition-all duration-300 ${
                        activeStep === index || (activeStep === null && index === 0)
                          ? "border-[#471396] bg-[#471396] text-white scale-110 shadow-lg shadow-[#471396]/50"
                          : "border-gray-300 bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span className="text-lg sm:text-xl font-bold">{step.number}</span>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div
                    className={`flex-1 bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border transition-all duration-300 ${
                      activeStep === index
                        ? "border-[#471396] shadow-2xl shadow-[#471396]/30 scale-[1.02]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#471396] to-[#B13BFF] text-white shadow-lg">
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[#471396] font-semibold text-sm sm:text-base whitespace-nowrap">
                        <Clock className="h-4 w-4" />
                        {step.duration}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 text-center hover:border-[#471396]/50 transition-all duration-300 hover:scale-105 shadow-lg">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#471396] mb-2">
              6 Months
            </div>
            <div className="text-gray-900 font-semibold text-sm sm:text-base">
              Total Timeline
            </div>
            <div className="text-gray-600 text-xs sm:text-sm mt-1">
              From funding to repayment
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 text-center hover:border-[#471396]/50 transition-all duration-300 hover:scale-105 shadow-lg">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#471396] mb-2">
              $200k
            </div>
            <div className="text-gray-900 font-semibold text-sm sm:text-base">
              Principal Return
            </div>
            <div className="text-gray-600 text-xs sm:text-sm mt-1">
              Principal amount returned
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 text-center hover:border-[#471396]/50 transition-all duration-300 hover:scale-105 shadow-lg">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#471396] mb-2">
              $22k
            </div>
            <div className="text-gray-900 font-semibold text-sm sm:text-base">
              Interest Payment
            </div>
            <div className="text-gray-600 text-xs sm:text-sm mt-1">
              Interest for 6 months
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export { CashProgram };
