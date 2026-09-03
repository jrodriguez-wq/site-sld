import Image from "next/image";

/**
 * Public-facing placeholder while the marketing site is offline.
 * Intentionally contains no phone, email, address, pricing, or nav.
 */
export function UnderConstruction() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#090040] px-6 py-16 text-center text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#D4AF37]/15 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 flex max-w-lg flex-col items-center gap-8">
        <Image
          src="/logos/sld-blanco.svg"
          alt="Standard Land Development"
          width={220}
          height={88}
          className="h-16 w-auto sm:h-20"
          priority
        />

        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
            Site update
          </p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            We&apos;re rebuilding our website
          </h1>
          <p className="mx-auto max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            Standard Land Development is temporarily offline while we finish a
            new experience. Please check back soon.
          </p>
        </div>

        <div
          className="h-px w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent"
          aria-hidden
        />

        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
          Coming back shortly
        </p>
      </div>
    </div>
  );
}
