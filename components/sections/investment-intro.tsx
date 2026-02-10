"use client";

import { Container } from "@/components/ui/container";
import { TrendingUp, Shield, Building2 } from "lucide-react";

export const InvestmentIntro = () => (
  <section className="py-10 sm:py-16 md:py-20 lg:py-24 bg-white relative">
    <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
    <Container className="relative z-10">
      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 px-1">
        <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#090040] mb-3 sm:mb-4">
          Why Invest with SLD
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6">
          Investing in Affordable Housing Builds Community and Returns
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
          When you invest with Standard Land Development, you partner with a team that has built over 1,500 homes.
          Real property-backed investments, transparent processes, and a track record of delivering on commitments.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#090040]/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99]">
          <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-[#090040]/10 mb-3 sm:mb-4">
            <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-[#090040]" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1.5 sm:mb-2 text-sm sm:text-base">Proven Returns</h3>
          <p className="text-xs sm:text-sm text-slate-600">Clear timeline and predictable outcomes for lenders.</p>
        </div>
        <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#090040]/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99]">
          <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-[#090040]/10 mb-3 sm:mb-4">
            <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-[#090040]" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1.5 sm:mb-2 text-sm sm:text-base">Real Property Backed</h3>
          <p className="text-xs sm:text-sm text-slate-600">All capital is secured by real property assets.</p>
        </div>
        <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#090040]/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99]">
          <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-[#090040]/10 mb-3 sm:mb-4">
            <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-[#090040]" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1.5 sm:mb-2 text-sm sm:text-base">Addressing the Crisis</h3>
          <p className="text-xs sm:text-sm text-slate-600">Helping solve America&apos;s affordable housing shortage.</p>
        </div>
      </div>
    </Container>
  </section>
);
