"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MapPin, ArrowRight, Phone } from "lucide-react";

const OFFICE_ADDRESS = "45 Bridge St, LaBelle, FL 33935";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=45+Bridge+St+LaBelle+FL+33935";

export const InvestmentVisit = () => (
  <section className="py-16 sm:py-20 md:py-24 bg-slate-50 relative">
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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#090040]/10">
                <MapPin className="h-7 w-7 text-[#090040]" aria-hidden="true" />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500">
                  Visit Our Office
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 mb-1">
                  Standard Land Development
                </h3>
                <address className="text-slate-600 not-italic leading-relaxed">
                  {OFFICE_ADDRESS}
                </address>
                <p className="text-sm text-slate-500 mt-2">
                  LaBelle, Florida
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#090040] text-white font-semibold text-sm hover:bg-[#0a0044] transition-colors"
              >
                Get Directions
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#090040] text-[#090040] font-semibold text-sm hover:bg-[#090040] hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Schedule a Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);
