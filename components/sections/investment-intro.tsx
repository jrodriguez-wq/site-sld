"use client";

import { Container } from "@/components/ui/container";
import { TrendingUp, Shield, Building2 } from "lucide-react";

export const InvestmentIntro = () => (
  <section className="py-16 sm:py-20 md:py-24 bg-white relative">
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
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#090040] mb-4">
          Why Invest with SLD
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
          Investing in Affordable Housing Builds Community and Returns
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          When you invest with Standard Land Development, you partner with a team that has built over 1,500 homes.
          Real property-backed investments, transparent processes, and a track record of delivering on commitments.
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
        <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#090040]/20 transition-all duration-300 hover:-translate-y-1">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#090040]/10 mb-4">
            <TrendingUp className="h-7 w-7 text-[#090040]" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Proven Returns</h3>
          <p className="text-sm text-slate-600">Clear timeline and predictable outcomes for lenders.</p>
        </div>
        <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#090040]/20 transition-all duration-300 hover:-translate-y-1">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#090040]/10 mb-4">
            <Shield className="h-7 w-7 text-[#090040]" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Real Property Backed</h3>
          <p className="text-sm text-slate-600">All capital is secured by real property assets.</p>
        </div>
        <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#090040]/20 transition-all duration-300 hover:-translate-y-1">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#090040]/10 mb-4">
            <Building2 className="h-7 w-7 text-[#090040]" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Addressing the Crisis</h3>
          <p className="text-sm text-slate-600">Helping solve America&apos;s affordable housing shortage.</p>
        </div>
      </div>
    </Container>
  </section>
);
