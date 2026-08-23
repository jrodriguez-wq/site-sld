"use client";

import { useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { getStoredConsent, setStoredConsent } from "@/lib/consent/cookie-consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(() => getStoredConsent() === null);

  const handleChoice = (accepted: boolean) => {
    setStoredConsent(accepted ? "accepted" : "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[9995] p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pointer-events-none"
    >
      <div className="pointer-events-auto w-full max-w-5xl mx-auto rounded-xl border border-[#090040]/15 bg-white shadow-lg p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <Cookie className="hidden sm:block h-5 w-5 text-[#090040] shrink-0" aria-hidden />
        <p className="text-sm text-slate-600 leading-relaxed flex-1">
          We use cookies for essential site functions and, if you accept, analytics and advertising. See our{" "}
          <Link href="/cookies" className="text-[#090040] font-semibold underline">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-[#090040] font-semibold underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleChoice(false)}
            className="flex-1 sm:flex-none min-h-11 px-4 rounded-md border border-slate-300 text-sm font-semibold text-slate-800"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handleChoice(true)}
            className="flex-1 sm:flex-none min-h-11 px-4 rounded-md bg-[#090040] text-white text-sm font-semibold"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
