"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  ArrowRight,
  ChevronUp 
} from "lucide-react";

// Types
interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  columns?: FooterColumn[];
  showNewsletter?: boolean;
  className?: string;
}

// Default columns
const defaultColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about/team" },
      { label: "Careers", href: "/careers" },
      { label: "News & Press", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Homes",
    links: [
      { label: "Available Homes", href: "/homes" },
      { label: "Floor Plans", href: "/homes/floor-plans" },
      { label: "Communities", href: "/communities" },
      { label: "Gallery", href: "/gallery" },
      { label: "Virtual Tours", href: "/virtual-tours" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "How It Works", href: "/process" },
      { label: "FAQs", href: "/faq" },
      { label: "Financing Options", href: "/financing" },
      { label: "Buyer's Guide", href: "/buyers-guide" },
      { label: "Warranty Info", href: "/warranty" },
    ],
  },
  {
    title: "Investors",
    links: [
      { label: "Become a Lender", href: "/investors/lender" },
      { label: "Investment Returns", href: "/investors/returns" },
      { label: "Investor Portal", href: "/investors/portal" },
      { label: "Investor FAQ", href: "/investors/faq" },
    ],
  },
];

// Social links
const socialLinks = [
  { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com", label: "Facebook" },
  { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com", label: "Instagram" },
  { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com", label: "YouTube" },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Footer = ({
  columns = defaultColumns,
  showNewsletter = true,
  className = "",
}: FooterProps) => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className={`relative bg-slate-950 border-t border-white/5 ${className}`}
    >
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="py-16 sm:py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand Column */}
            <motion.div variants={fadeUpVariants} className="lg:col-span-4">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3 group mb-6">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm rotate-45 transition-transform duration-300 group-hover:rotate-[55deg]" />
                  <span 
                    className="relative text-slate-950 font-bold text-xl"
                    style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
                  >
                    S
                  </span>
                </div>
                <div className="flex flex-col">
                  <span 
                    className="text-white text-xl font-light tracking-wide leading-none"
                    style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
                  >
                    Standard Land
                  </span>
                  <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-medium">
                    Development
                  </span>
                </div>
              </Link>

              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
                Building dreams into reality since 2016. Over 2,800 families have found their 
                perfect home with our $0 down payment program.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a 
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-white/60 hover:text-amber-400 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  (123) 456-7890
                </a>
                <a 
                  href="mailto:hello@sld.com"
                  className="flex items-center gap-3 text-white/60 hover:text-amber-400 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  hello@standardland.com
                </a>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <MapPin className="w-4 h-4" />
                  Tampa, Florida
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-amber-400 hover:border-amber-400/30 hover:bg-amber-400/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Navigation Columns */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {columns.map((column, index) => (
                  <motion.div key={column.title} variants={fadeUpVariants}>
                    <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
                      {column.title}
                    </h4>
                    <ul className="space-y-3">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-white/50 hover:text-amber-400 transition-colors text-sm"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        {showNewsletter && (
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="py-10 border-t border-white/5"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-white font-semibold mb-1">Stay Updated</h4>
                <p className="text-white/50 text-sm">Subscribe for news, tips, and exclusive offers.</p>
              </div>
              <form className="flex w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 sm:w-64 px-4 py-3 bg-white/5 border border-white/10 border-r-0 rounded-l-lg text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-r-lg transition-colors flex items-center gap-2"
                >
                  <span className="hidden sm:inline text-sm">Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Bottom Bar */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="py-6 border-t border-white/5"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-white/40 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} Standard Land Development. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-xs">
              <Link href="/privacy" className="text-white/40 hover:text-white/70 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/40 hover:text-white/70 transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-white/40 hover:text-white/70 transition-colors">
                Accessibility
              </Link>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="hidden sm:flex items-center gap-2 text-xs text-white/40 hover:text-amber-400 transition-colors group"
            >
              Back to top
              <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </footer>
  );
};

export { Footer };
export type { FooterProps, FooterColumn, FooterLink };
