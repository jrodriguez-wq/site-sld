"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Bed, 
  Bath, 
  Square, 
  Car, 
  ArrowRight, 
  ZoomIn,
  Download,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
interface FloorPlanLevel {
  name: string;
  image: string;
  rooms?: string[];
}

interface FloorPlan {
  id: string;
  name: string;
  subtitle?: string;
  sqft: number;
  beds: number;
  baths: number;
  garage?: number;
  price?: string;
  levels: FloorPlanLevel[];
  exteriorImage?: string;
  features?: string[];
  available?: boolean;
}

interface FloorPlanViewerProps {
  plans: FloorPlan[];
  eyebrow?: string;
  headline?: string;
  highlightedText?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
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

const FloorPlanViewer = ({
  plans,
  eyebrow = "Floor Plans",
  headline = "Choose Your",
  highlightedText = "Perfect Layout",
  description = "Explore our thoughtfully designed floor plans, each crafted to maximize space and comfort.",
  ctaText = "Schedule a Tour",
  ctaHref = "/contact",
  theme = "dark",
  className = "",
}: FloorPlanViewerProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [selectedPlan, setSelectedPlan] = useState<FloorPlan>(plans[0]);
  const [activeLevel, setActiveLevel] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isDark = theme === "dark";

  const navigatePlan = (direction: number) => {
    const currentIndex = plans.findIndex(p => p.id === selectedPlan.id);
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = plans.length - 1;
    if (newIndex >= plans.length) newIndex = 0;
    setSelectedPlan(plans[newIndex]);
    setActiveLevel(0);
  };

  return (
    <>
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

          {/* Plan Selector */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide"
          >
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => {
                  setSelectedPlan(plan);
                  setActiveLevel(0);
                }}
                className={`
                  flex-shrink-0 px-6 py-4 rounded-xl transition-all text-left
                  ${selectedPlan.id === plan.id
                    ? isDark 
                      ? "bg-amber-500 text-slate-950" 
                      : "bg-slate-900 text-white"
                    : isDark 
                      ? "bg-white/[0.03] border border-white/10 hover:border-white/20 text-white" 
                      : "bg-white border border-slate-200 hover:border-slate-300 text-slate-900"
                  }
                `}
              >
                <div className="font-semibold">{plan.name}</div>
                <div className={`text-sm ${selectedPlan.id === plan.id ? "opacity-70" : isDark ? "text-white/50" : "text-slate-500"}`}>
                  {plan.beds} Bed • {plan.baths} Bath • {plan.sqft.toLocaleString()} sqft
                </div>
              </button>
            ))}
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Floor Plan Image */}
            <div className="lg:col-span-2">
              <div className={`
                relative rounded-2xl overflow-hidden
                ${isDark ? "bg-white" : "bg-white border border-slate-200"}
              `}>
                {/* Level Tabs */}
                {selectedPlan.levels.length > 1 && (
                  <div className="flex border-b border-slate-200">
                    {selectedPlan.levels.map((level, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveLevel(index)}
                        className={`
                          flex-1 px-4 py-3 text-sm font-semibold transition-all
                          ${activeLevel === index
                            ? "bg-amber-500 text-slate-950"
                            : "text-slate-600 hover:bg-slate-50"
                          }
                        `}
                      >
                        {level.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-[4/3] bg-white">
                  <Image
                    src={selectedPlan.levels[activeLevel].image}
                    alt={`${selectedPlan.name} - ${selectedPlan.levels[activeLevel].name}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />

                  {/* Zoom Button */}
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900/80 text-white hover:bg-slate-900 transition-colors"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>

                  {/* Navigation */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <button
                      onClick={() => navigatePlan(-1)}
                      className="p-2 rounded-lg bg-slate-900/80 text-white hover:bg-slate-900 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigatePlan(1)}
                      className="p-2 rounded-lg bg-slate-900/80 text-white hover:bg-slate-900 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Room List */}
                {selectedPlan.levels[activeLevel].rooms && (
                  <div className="p-4 border-t border-slate-200 bg-slate-50">
                    <div className="flex flex-wrap gap-2">
                      {selectedPlan.levels[activeLevel].rooms.map((room, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600"
                        >
                          {room}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Plan Details */}
            <div className={`
              p-6 rounded-2xl
              ${isDark ? "bg-white/[0.03] border border-white/10" : "bg-white border border-slate-200"}
            `}>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 
                      className={`text-2xl font-light ${isDark ? "text-white" : "text-slate-900"}`}
                      style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
                    >
                      {selectedPlan.name}
                    </h3>
                    {selectedPlan.subtitle && (
                      <p className={`text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>
                        {selectedPlan.subtitle}
                      </p>
                    )}
                  </div>
                  {selectedPlan.available !== false && (
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded">
                      Available
                    </span>
                  )}
                </div>
                {selectedPlan.price && (
                  <p 
                    className="text-2xl font-light"
                    style={{ 
                      background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {selectedPlan.price}
                  </p>
                )}
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
                  <Bed className={`w-5 h-5 mb-2 ${isDark ? "text-amber-400" : "text-amber-500"}`} />
                  <div className={`text-2xl font-light ${isDark ? "text-white" : "text-slate-900"}`}>
                    {selectedPlan.beds}
                  </div>
                  <div className={`text-xs uppercase tracking-wider ${isDark ? "text-white/40" : "text-slate-500"}`}>
                    Bedrooms
                  </div>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
                  <Bath className={`w-5 h-5 mb-2 ${isDark ? "text-amber-400" : "text-amber-500"}`} />
                  <div className={`text-2xl font-light ${isDark ? "text-white" : "text-slate-900"}`}>
                    {selectedPlan.baths}
                  </div>
                  <div className={`text-xs uppercase tracking-wider ${isDark ? "text-white/40" : "text-slate-500"}`}>
                    Bathrooms
                  </div>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
                  <Square className={`w-5 h-5 mb-2 ${isDark ? "text-amber-400" : "text-amber-500"}`} />
                  <div className={`text-2xl font-light ${isDark ? "text-white" : "text-slate-900"}`}>
                    {selectedPlan.sqft.toLocaleString()}
                  </div>
                  <div className={`text-xs uppercase tracking-wider ${isDark ? "text-white/40" : "text-slate-500"}`}>
                    Sq. Feet
                  </div>
                </div>
                {selectedPlan.garage && (
                  <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
                    <Car className={`w-5 h-5 mb-2 ${isDark ? "text-amber-400" : "text-amber-500"}`} />
                    <div className={`text-2xl font-light ${isDark ? "text-white" : "text-slate-900"}`}>
                      {selectedPlan.garage}
                    </div>
                    <div className={`text-xs uppercase tracking-wider ${isDark ? "text-white/40" : "text-slate-500"}`}>
                      Car Garage
                    </div>
                  </div>
                )}
              </div>

              {/* Features */}
              {selectedPlan.features && selectedPlan.features.length > 0 && (
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? "text-white/80" : "text-slate-700"}`}>
                    Features
                  </h4>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <li 
                        key={index}
                        className={`flex items-center gap-2 text-sm ${isDark ? "text-white/60" : "text-slate-600"}`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-6 rounded-xl"
                  asChild
                >
                  <Link href={ctaHref} className="flex items-center justify-center gap-2">
                    {ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className={`
                    w-full py-6 rounded-xl
                    ${isDark 
                      ? "border-white/20 text-white hover:bg-white/5" 
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }
                  `}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Floor Plan
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full h-full p-8">
            <Image
              src={selectedPlan.levels[activeLevel].image}
              alt={`${selectedPlan.name} - ${selectedPlan.levels[activeLevel].name}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
};

export { FloorPlanViewer };
export type { FloorPlanViewerProps, FloorPlan, FloorPlanLevel };
