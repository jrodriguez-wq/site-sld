"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden h-[95vh] min-h-[700px] max-h-[1000px] flex items-center justify-center text-white">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/SLD-video1.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Blur Overlay - Blue tint for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#090040]/80 via-[#2d2c55]/75 to-[#090040]/80 backdrop-blur-[2px]" />
      
      {/* Additional gradient overlay for better text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#090040]/90 via-transparent to-transparent" />
      
      <Container className="relative z-10 py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 shadow-2xl">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#D4AF37]" />
            <span className="text-xs sm:text-sm font-semibold">Since 2016 • Southwest Florida</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight px-4">
            Creating the Opportunity of{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                Home Ownership
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] blur-xl opacity-50 animate-pulse" />
            </span>{" "}
            for American Families
          </h1>
          
          {/* Subheading */}
          <p className="mt-3 sm:mt-4 md:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 max-w-4xl mx-auto font-medium px-4">
            We Build so American Families can OWN the American Dream, NOT rent the American Dream
          </p>
          
          {/* Quote */}
          <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-white/70 italic font-medium px-4">
            — Michael J. Newell, CEO Standard Land Development
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white text-[#090040] hover:bg-white/95 shadow-xl hover:shadow-lg transition-all duration-200 text-base sm:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 rounded-xl font-bold" 
              asChild
            >
              <Link href="/contact" prefetch={true} className="flex items-center justify-center gap-2">
                Invest With Us
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-base sm:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 rounded-full font-semibold bg-white/5" 
              asChild
            >
              <Link href="/about" prefetch={true} className="flex items-center justify-center">
                Learn More
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl hover:border-white/40 hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent mb-1 sm:mb-2">1,500+</div>
                <div className="text-white/90 text-sm sm:text-base md:text-lg font-semibold">Homes Built</div>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl hover:border-white/40 hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent mb-1 sm:mb-2">1,500+</div>
                <div className="text-white/90 text-sm sm:text-base md:text-lg font-semibold">Happy Families</div>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl hover:border-white/40 hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent mb-1 sm:mb-2">$0</div>
                <div className="text-white/90 text-sm sm:text-base md:text-lg font-semibold">Down Payment</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export { Hero };
