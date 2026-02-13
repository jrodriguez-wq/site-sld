"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ChevronDown, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
}

interface NavigationProps {
  variant?: "transparent" | "solid";
  className?: string;
}

// Navigation items configuration
const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { 
    label: "About", 
    href: "/about",
    children: [
      { label: "Our Story", href: "/about", description: "Learn about our journey since 2016" },
      { label: "Our Team", href: "/about/team", description: "Meet the people behind SLD" },
      { label: "Careers", href: "/careers", description: "Join our growing family" },
    ]
  },
  { 
    label: "Homes", 
    href: "/homes",
    children: [
      { label: "Available Homes", href: "/homes", description: "Browse move-in ready properties" },
      { label: "Floor Plans", href: "/homes/floor-plans", description: "Explore our home designs" },
      { label: "Communities", href: "/communities", description: "Discover our neighborhoods" },
      { label: "Gallery", href: "/gallery", description: "View our craftsmanship" },
    ]
  },
  { label: "Process", href: "/process" },
  { 
    label: "Investors", 
    href: "/investors",
    children: [
      { label: "Become a Lender", href: "/investors/lender", description: "Investment opportunities" },
      { label: "Returns", href: "/investors/returns", description: "See potential returns" },
      { label: "FAQ", href: "/investors/faq", description: "Common questions answered" },
    ]
  },
  { label: "Contact", href: "/contact" },
];

// Animation variants
const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
};

const mobileMenuVariants = {
  closed: { 
    opacity: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  },
  open: { 
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
};

const mobileNavItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }),
};

const dropdownVariants = {
  hidden: { 
    opacity: 0, 
    y: 10,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: 5,
    scale: 0.98,
    transition: { duration: 0.15 }
  }
};

const Navigation = ({ variant = "transparent", className = "" }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const { scrollY } = useScroll();

  // Handle scroll behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrollingDown = latest > lastScrollY;
    const scrollThreshold = 100;
    
    // Show/hide based on scroll direction
    if (latest > scrollThreshold) {
      setIsVisible(!isScrollingDown);
    } else {
      setIsVisible(true);
    }
    
    // Solid background after scrolling
    setIsScrolled(latest > 50);
    setLastScrollY(latest);
  });

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside
  const handleMouseLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${isScrolled || variant === "solid"
            ? "bg-slate-950/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20"
            : "bg-transparent"
          }
          ${className}
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            
            {/* Logo */}
            <Link 
              href="/" 
              className="relative z-10 flex items-center gap-3 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {/* Logo Mark */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm rotate-45 transition-transform duration-300 group-hover:rotate-[55deg]" />
                <span 
                  className="relative text-slate-950 font-bold text-lg"
                  style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
                >
                  S
                </span>
              </div>
              {/* Logo Text */}
              <div className="hidden sm:flex flex-col">
                <span 
                  className="text-white text-lg font-light tracking-wide leading-none"
                  style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
                >
                  Standard Land
                </span>
                <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-medium">
                  Development
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1" onMouseLeave={handleMouseLeave}>
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    // Dropdown trigger
                    <button
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className={`
                        flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wide
                        transition-colors duration-300
                        ${activeDropdown === item.label 
                          ? "text-amber-400" 
                          : "text-white/70 hover:text-white"
                        }
                      `}
                    >
                      {item.label}
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    // Regular link
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/30 overflow-hidden"
                        onMouseEnter={() => setActiveDropdown(item.label)}
                      >
                        <div className="p-2">
                          {item.children.map((child, idx) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex flex-col gap-1 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 group"
                            >
                              <span className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                        {/* Dropdown footer */}
                        <div className="border-t border-white/5 p-3 bg-white/[0.02]">
                          <Link 
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
                          >
                            View all {item.label.toLowerCase()}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">(123) 456-7890</span>
              </a>
              <Button
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-6 py-5 text-sm tracking-wider uppercase rounded-none transition-all duration-300"
                asChild
              >
                <Link href="/contact">
                  Get Started
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 p-2 text-white"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/98 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Content */}
            <div className="relative h-full flex flex-col pt-24 pb-8 px-6 overflow-y-auto">
              {/* Navigation Links */}
              <nav className="flex-1">
                <ul className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.label}
                      custom={i}
                      variants={mobileNavItemVariants}
                      initial="closed"
                      animate="open"
                    >
                      {item.children ? (
                        <div>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                            className="flex items-center justify-between w-full py-4 text-2xl font-light text-white border-b border-white/5"
                            style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
                          >
                            {item.label}
                            <ChevronDown 
                              className={`w-5 h-5 text-white/40 transition-transform duration-300 ${
                                activeDropdown === item.label ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="py-2 pl-4 space-y-1">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block py-3 text-base text-white/60 hover:text-amber-400 transition-colors"
                                    >
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-4 text-2xl font-light text-white border-b border-white/5 hover:text-amber-400 transition-colors"
                          style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Mobile CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="pt-8 space-y-4"
              >
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-6 text-sm tracking-wider uppercase rounded-none"
                  asChild
                >
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                
                <a 
                  href="tel:+1234567890"
                  className="flex items-center justify-center gap-3 py-4 text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>(123) 456-7890</span>
                </a>
              </motion.div>

              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="pt-8 border-t border-white/5"
              >
                <p className="text-xs text-white/30 text-center">
                  © 2024 Standard Land Development. All rights reserved.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { Navigation };
export type { NavigationProps, NavItem };
