import Image from "next/image";

/**
 * Global loading UI. Shown during route transitions and while segment data loads.
 * Branded, minimal, no client JS required.
 */
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-[#090040] text-white"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="relative flex flex-col items-center gap-6">
        <Image
          src="/logos/sld-blanco.svg"
          alt="Standard Land Development"
          width={200}
          height={80}
          className="h-14 w-auto sm:h-16 md:h-20 opacity-95"
          priority
        />
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-1 w-32 overflow-hidden rounded-full bg-white/20"
            aria-hidden
          >
            <div className="loading-bar h-full w-1/2 rounded-full bg-white" />
          </div>
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/70">
            Loading
          </span>
        </div>
      </div>
    </div>
  );
}
