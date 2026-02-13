"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

// Types
interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  location?: string;
  image?: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  eyebrow?: string;
  headline: string;
  highlightedText?: string;
  testimonials?: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
  theme?: "dark" | "light";
  className?: string;
}

// Default testimonials
const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The $0 down payment program changed our lives. We never thought homeownership was possible for us, but SLD made it happen. The entire team was supportive and transparent throughout the process.",
    author: "Maria & Carlos Rodriguez",
    role: "Homeowners since 2023",
    location: "Tampa, FL",
    image: "/testimonials/family-1.jpg",
    rating: 5,
  },
  {
    id: 2,
    quote: "From the first meeting to getting our keys, everything was seamless. The quality of construction exceeded our expectations. We couldn't be happier with our new home.",
    author: "The Johnson Family",
    role: "Homeowners since 2022",
    location: "Orlando, FL",
    image: "/testimonials/family-2.jpg",
    rating: 5,
  },
  {
    id: 3,
    quote: "As first-time homebuyers, we had so many questions. The SLD team took the time to explain everything and made us feel confident in our decision. Best choice we ever made.",
    author: "David & Sarah Mitchell",
    role: "Homeowners since 2024",
    location: "Jacksonville, FL",
    image: "/testimonials/family-3.jpg",
    rating: 5,
  },
  {
    id: 4,
    quote: "The attention to detail in our home is remarkable. Every corner shows the craftsmanship and care that went into building it. SLD truly delivers on their promises.",
    author: "The Williams Family",
    role: "Homeowners since 2023",
    location: "Miami, FL",
    image: "/testimonials/family-4.jpg",
    rating: 5,
  },
];

// Animation variants
const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const TestimonialsSection = ({
  eyebrow = "Testimonials",
  headline = "What Our",
  highlightedText = "Families Say",
  testimonials = defaultTestimonials,
  autoplay = true,
  autoplayInterval = 6000,
  theme = "dark",
  className = "",
}: TestimonialsSectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const isDark = theme === "dark";

  // Navigation functions
  const paginate = useCallback((newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex < 0) {
      setCurrentIndex([testimonials.length - 1, newDirection]);
    } else if (newIndex >= testimonials.length) {
      setCurrentIndex([0, newDirection]);
    } else {
      setCurrentIndex([newIndex, newDirection]);
    }
  }, [currentIndex, testimonials.length]);

  const goToSlide = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setCurrentIndex([index, newDirection]);
  };

  // Autoplay
  useEffect(() => {
    if (!autoplay || isPaused) return;

    const interval = setInterval(() => {
      paginate(1);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, isPaused, paginate]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden py-24 sm:py-32
        ${isDark ? "bg-slate-900" : "bg-white"}
        ${className}
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Elements */}
      {isDark && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl" />
        </>
      )}

      {/* Large Quote Mark Background */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none">
        <Quote 
          className={`w-48 h-48 ${isDark ? "text-white/[0.02]" : "text-slate-100"}`}
          strokeWidth={1}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          {/* Eyebrow */}
          <div className="mb-6">
            <span className={`
              inline-flex items-center gap-3
              text-[11px] font-semibold tracking-[0.25em] uppercase
              ${isDark ? "text-amber-400" : "text-amber-600"}
            `}>
              <span className="w-8 h-px bg-current opacity-50" />
              {eyebrow}
              <span className="w-8 h-px bg-current opacity-50" />
            </span>
          </div>

          {/* Headline */}
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
                  backgroundClip: "text",
                }}
              >
                {highlightedText}
              </span>
            )}
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <div className={`
            relative max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl
            ${isDark 
              ? "bg-white/[0.03] border border-white/5" 
              : "bg-slate-50 border border-slate-100"
            }
          `}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-center"
              >
                {/* Rating */}
                {currentTestimonial.rating && (
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-5 h-5 ${
                          i < currentTestimonial.rating!
                            ? "text-amber-400 fill-amber-400"
                            : isDark ? "text-white/20" : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Quote */}
                <blockquote>
                  <p 
                    className={`
                      text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed
                      ${isDark ? "text-white/90" : "text-slate-700"}
                    `}
                    style={{ fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)" }}
                  >
                    "{currentTestimonial.quote}"
                  </p>
                </blockquote>

                {/* Author */}
                <div className="mt-8 flex flex-col items-center">
                  {/* Author Image */}
                  {currentTestimonial.image && (
                    <div className="relative w-16 h-16 mb-4 rounded-full overflow-hidden ring-2 ring-amber-400/30">
                      <Image
                        src={currentTestimonial.image}
                        alt={currentTestimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Author Placeholder if no image */}
                  {!currentTestimonial.image && (
                    <div className={`
                      w-16 h-16 mb-4 rounded-full flex items-center justify-center
                      ${isDark 
                        ? "bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-400/20" 
                        : "bg-amber-50 border-2 border-amber-100"
                      }
                    `}>
                      <span 
                        className={`text-2xl font-light ${isDark ? "text-amber-400" : "text-amber-600"}`}
                        style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
                      >
                        {currentTestimonial.author.charAt(0)}
                      </span>
                    </div>
                  )}

                  <cite className="not-italic">
                    <div className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {currentTestimonial.author}
                    </div>
                    <div className={`text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>
                      {currentTestimonial.role}
                      {currentTestimonial.location && ` • ${currentTestimonial.location}`}
                    </div>
                  </cite>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4 sm:-mx-6">
              <button
                onClick={() => paginate(-1)}
                className={`
                  pointer-events-auto p-3 rounded-full transition-all duration-300
                  ${isDark 
                    ? "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10" 
                    : "bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 shadow-lg"
                  }
                `}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => paginate(1)}
                className={`
                  pointer-events-auto p-3 rounded-full transition-all duration-300
                  ${isDark 
                    ? "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10" 
                    : "bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 shadow-lg"
                  }
                `}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  relative h-2 rounded-full transition-all duration-300
                  ${index === currentIndex 
                    ? "w-8 bg-amber-400" 
                    : `w-2 ${isDark ? "bg-white/20 hover:bg-white/40" : "bg-slate-200 hover:bg-slate-300"}`
                  }
                `}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Autoplay Indicator */}
          {autoplay && (
            <div className="flex justify-center mt-4">
              <span className={`text-xs ${isDark ? "text-white/30" : "text-slate-400"}`}>
                {isPaused ? "Paused" : "Auto-playing"}
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export { TestimonialsSection };
export type { TestimonialsSectionProps, Testimonial };
