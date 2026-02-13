"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Expand, MapPin, Home, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
interface Project {
  id: string;
  title: string;
  location: string;
  image: string;
  category: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  price?: string;
  featured?: boolean;
}

interface PortfolioSectionProps {
  eyebrow?: string;
  headline: string;
  highlightedText?: string;
  description?: string;
  projects?: Project[];
  categories?: string[];
  ctaText?: string;
  ctaHref?: string;
  theme?: "dark" | "light";
  className?: string;
}

// Default projects
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "The Magnolia Estate",
    location: "Tampa, FL",
    image: "/projects/home-1.jpg",
    category: "Luxury",
    beds: 5,
    baths: 4,
    sqft: 3800,
    price: "$485,000",
    featured: true,
  },
  {
    id: "2",
    title: "Riverside Modern",
    location: "Orlando, FL",
    image: "/projects/home-2.jpg",
    category: "Modern",
    beds: 4,
    baths: 3,
    sqft: 2950,
    price: "$425,000",
  },
  {
    id: "3",
    title: "Palm Gardens",
    location: "Jacksonville, FL",
    image: "/projects/home-3.jpg",
    category: "Family",
    beds: 4,
    baths: 2.5,
    sqft: 2400,
    price: "$375,000",
  },
  {
    id: "4",
    title: "Sunset Villa",
    location: "Miami, FL",
    image: "/projects/home-4.jpg",
    category: "Luxury",
    beds: 6,
    baths: 5,
    sqft: 4200,
    price: "$650,000",
    featured: true,
  },
  {
    id: "5",
    title: "The Oakwood",
    location: "Tampa, FL",
    image: "/projects/home-5.jpg",
    category: "Traditional",
    beds: 3,
    baths: 2,
    sqft: 1850,
    price: "$295,000",
  },
  {
    id: "6",
    title: "Coastal Retreat",
    location: "Fort Lauderdale, FL",
    image: "/projects/home-6.jpg",
    category: "Modern",
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    price: "$525,000",
  },
];

const defaultCategories = ["All", "Luxury", "Modern", "Family", "Traditional"];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const PortfolioSection = ({
  eyebrow = "Our Portfolio",
  headline = "Homes We've",
  highlightedText = "Brought to Life",
  description = "Every home tells a story. Explore our collection of beautifully crafted residences across Florida.",
  projects = defaultProjects,
  categories = defaultCategories,
  ctaText = "View All Projects",
  ctaHref = "/portfolio",
  theme = "dark",
  className = "",
}: PortfolioSectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const isDark = theme === "dark";

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
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
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
        >
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div variants={fadeUpVariants} className="mb-6">
              <span className={`
                inline-flex items-center gap-3
                text-[11px] font-semibold tracking-[0.25em] uppercase
                ${isDark ? "text-amber-400" : "text-amber-600"}
              `}>
                <span className="w-8 h-px bg-current opacity-50" />
                {eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2 variants={fadeUpVariants}>
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
            </motion.h2>

            {description && (
              <motion.p 
                variants={fadeUpVariants}
                className={`mt-4 text-lg ${isDark ? "text-white/60" : "text-slate-600"}`}
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* Category Filter */}
          <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-5 py-2.5 text-sm font-medium tracking-wide
                  transition-all duration-300 rounded-full
                  ${activeCategory === category
                    ? isDark 
                      ? "bg-amber-500 text-slate-950" 
                      : "bg-slate-900 text-white"
                    : isDark 
                      ? "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10" 
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              variants={cardVariants}
              className={`group relative ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Link href={`/portfolio/${project.id}`} className="block">
                <div className={`
                  relative overflow-hidden rounded-2xl aspect-[4/3]
                  ${isDark ? "bg-slate-800" : "bg-slate-200"}
                `}>
                  {/* Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-semibold tracking-wider uppercase rounded-full">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Expand Icon */}
                  <div className={`
                    absolute top-4 right-4 z-10 p-2.5 rounded-full
                    bg-white/10 backdrop-blur-sm border border-white/20
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    translate-y-2 group-hover:translate-y-0
                  `}>
                    <Expand className="w-4 h-4 text-white" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    {/* Category */}
                    <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2 block">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-100 transition-colors">
                      {project.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-white/60 text-sm mb-4">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location}
                    </div>

                    {/* Details - Show on hover */}
                    <div className={`
                      flex items-center gap-4 text-white/70 text-sm
                      transform transition-all duration-300
                      ${hoveredProject === project.id 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-4"
                      }
                    `}>
                      {project.beds && (
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-4 h-4" />
                          {project.beds}
                        </div>
                      )}
                      {project.baths && (
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-4 h-4" />
                          {project.baths}
                        </div>
                      )}
                      {project.sqft && (
                        <div className="flex items-center gap-1.5">
                          <Square className="w-4 h-4" />
                          {project.sqft.toLocaleString()} sqft
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    {project.price && (
                      <div className={`
                        mt-3 text-lg font-semibold text-white
                        transform transition-all duration-300 delay-75
                        ${hoveredProject === project.id 
                          ? "opacity-100 translate-y-0" 
                          : "opacity-0 translate-y-4"
                        }
                      `}>
                        {project.price}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        {ctaText && (
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mt-12"
          >
            <Button
              className={`
                group relative overflow-hidden px-10 py-7 rounded-none
                text-sm font-semibold uppercase tracking-wider
                ${isDark 
                  ? "bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40" 
                  : "bg-slate-900 hover:bg-slate-800 text-white"
                }
                transition-all duration-500
              `}
              asChild
            >
              <Link href={ctaHref} className="flex items-center gap-3">
                <span className="relative z-10">{ctaText}</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export { PortfolioSection };
export type { PortfolioSectionProps, Project };
