import { useState, useEffect, useRef } from 'react';

// =============================================================================
// SLD COMPLETE WEBSITE PREVIEW
// Premium Home Builder Website Components
// =============================================================================

const SLDWebsitePreview = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { quote: "The $0 down payment program changed our lives. We never thought homeownership was possible.", author: "Maria & Carlos Rodriguez", location: "Tampa, FL" },
    { quote: "From the first meeting to getting our keys, everything was seamless. The quality exceeded expectations.", author: "The Johnson Family", location: "Orlando, FL" },
    { quote: "As first-time homebuyers, the SLD team made us feel confident. Best choice we ever made.", author: "David & Sarah Mitchell", location: "Jacksonville, FL" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      
      {/* ================================================================= */}
      {/* NAVIGATION */}
      {/* ================================================================= */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-slate-950/95 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm rotate-45 transition-transform duration-300 group-hover:rotate-[55deg]" />
              <span className="relative text-slate-950 font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>S</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-white text-lg font-light tracking-wide leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>Standard Land</span>
              <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-medium">Development</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {['Home', 'About', 'Homes', 'Process', 'Investors', 'Contact'].map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">{item}</a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="#" className="flex items-center gap-2 text-sm text-white/60 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span className="hidden xl:inline">(123) 456-7890</span>
            </a>
            <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-6 py-3 text-sm tracking-wider uppercase transition-all">
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2">
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[72px] bg-slate-950/98 backdrop-blur-xl z-40">
            <div className="p-6 space-y-1">
              {['Home', 'About', 'Homes', 'Process', 'Investors', 'Contact'].map((item) => (
                <a key={item} href="#" className="block py-4 text-2xl font-light text-white border-b border-white/5" style={{ fontFamily: "'Playfair Display', serif" }}>{item}</a>
              ))}
              <button className="w-full mt-8 bg-amber-500 text-slate-950 font-semibold py-4 text-sm uppercase tracking-wider">Get Started</button>
            </div>
          </div>
        )}
      </header>

      {/* ================================================================= */}
      {/* HERO SECTION */}
      {/* ================================================================= */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Video Background Simulation */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 50%, rgba(2,6,23,1) 100%)`
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
          }}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.5)_60%,rgba(2,6,23,0.9)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/95" />

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col min-h-screen pt-20">
          {/* Top Badge */}
          <div className="pt-12 flex justify-center">
            <div className={`flex flex-col items-center gap-4 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
              <span className="text-[11px] font-medium tracking-[0.35em] uppercase text-white/50">Est. 2016 · Florida</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
            <div className="max-w-5xl mx-auto text-center">
              <p className={`text-amber-400/80 font-medium tracking-[0.3em] uppercase text-[10px] mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                Standard Land Development
              </p>

              <h1 className={`transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                <span className="block text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[0.95] tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Build Your Legacy
                </span>
                <span 
                  className="block mt-3 text-5xl md:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight"
                  style={{ 
                    fontFamily: "'Playfair Display', Georgia, serif",
                    background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Zero Down.
                </span>
              </h1>

              {/* Divider */}
              <div className={`flex items-center justify-center gap-4 my-10 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/20" />
                <div className="w-1.5 h-1.5 rotate-45 border border-amber-400/50" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/20" />
              </div>

              <p className={`text-lg text-white/50 max-w-xl mx-auto leading-relaxed transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                Over 2,800 families have transformed their dreams into <span className="text-white/70">addresses</span>. Your story begins here.
              </p>

              {/* CTAs */}
              <div className={`flex flex-col sm:flex-row items-center justify-center gap-5 mt-12 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <button className="group relative overflow-hidden bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-10 py-5 text-sm tracking-wider uppercase transition-all duration-500">
                  <span className="relative z-10 flex items-center gap-3">
                    Become a Lender
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
                <button className="group border border-white/15 text-white hover:border-white/30 hover:bg-white/5 font-medium px-10 py-5 text-sm tracking-wider uppercase backdrop-blur-sm transition-all flex items-center gap-3">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  View Portfolio
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="border-t border-white/5">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-3 divide-x divide-white/5">
                <div className="group px-8 py-8 text-center transition-colors hover:bg-white/[0.02]">
                  <div className="text-3xl md:text-4xl font-light text-white tracking-tight">2,877</div>
                  <div className="mt-1 text-[10px] text-white/40 tracking-[0.2em] uppercase font-medium">Homes Delivered</div>
                </div>
                <div className="group px-8 py-8 text-center transition-colors hover:bg-white/[0.02]">
                  <div className="text-3xl md:text-4xl font-light text-white tracking-tight">100%</div>
                  <div className="mt-1 text-[10px] text-white/40 tracking-[0.2em] uppercase font-medium">Client Satisfaction</div>
                </div>
                <div className="group relative px-8 py-8 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-3xl md:text-4xl font-light tracking-tight" style={{ background: "linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>$0</div>
                    <div className="mt-1 text-[10px] text-amber-400/60 tracking-[0.2em] uppercase font-medium">Down Payment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SPLIT CONTENT SECTION */}
      {/* ================================================================= */}
      <section className="bg-slate-950">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
          {/* Content */}
          <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16 lg:py-24">
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-400 mb-6">
              <span className="w-8 h-px bg-amber-400/50" />About Us
            </span>
            <h2>
              <span className="block text-4xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Building Dreams</span>
              <span className="block mt-2 text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight" style={{ fontFamily: "'Playfair Display', serif", background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Since 2016</span>
            </h2>
            <p className="mt-6 text-lg text-white/60 max-w-lg leading-relaxed">We've helped over 2,800 families achieve homeownership with our revolutionary $0 down payment program.</p>
            
            <ul className="mt-8 space-y-4">
              {["$0 Down Payment", "Quality Construction", "10-Year Warranty"].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-white font-semibold">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6 mt-10">
              <button className="group bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-8 py-4 text-sm uppercase tracking-wider transition-all flex items-center gap-3">
                Get Started
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden min-h-[400px] lg:min-h-full">
            <div className="absolute z-10 top-8 left-0 right-8 bottom-8 border-l-2 border-t-2 border-b-2 border-white/10 hidden lg:block" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1e293b 0%, #334155 30%, #475569 60%, #64748b 100%)" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* PROCESS SECTION */}
      {/* ================================================================= */}
      <section className="relative bg-slate-950 py-24">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-400 mb-6">
              <span className="w-8 h-px bg-amber-400/50" />The Process<span className="w-8 h-px bg-amber-400/50" />
            </span>
            <h2>
              <span className="block text-4xl lg:text-5xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Your Journey to</span>
              <span className="block mt-1 text-4xl lg:text-5xl font-normal" style={{ fontFamily: "'Playfair Display', serif", background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Homeownership</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Pre-Qualification", desc: "Complete our simple 5-minute application" },
              { num: "02", title: "Choose Your Home", desc: "Browse available homes and floor plans" },
              { num: "03", title: "Meet Your Team", desc: "Personal advisor guides you through" },
              { num: "04", title: "Move In", desc: "Receive the keys to your new home" },
            ].map((step, i) => (
              <div key={i} className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all text-center">
                <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-400/20 flex items-center justify-center group-hover:border-amber-400/40 transition-all">
                  <span className="text-2xl font-light text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>{step.num}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-white/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* IMAGE COMPARE SECTION */}
      {/* ================================================================= */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Left Image */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #1e3a5f 0%, #0c4a6e 50%, #164e63 100%)" }} />
        
        {/* Right Image with Diagonal */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #44403c 0%, #78716c 50%, #a8a29e 100%)",
            clipPath: "polygon(calc(50% + 12%) 0%, 100% 0%, 100% 100%, calc(50% - 12%) 100%)",
          }}
        />

        {/* Divider */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px z-10" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), transparent)", transform: "translateX(-50%) rotate(12deg) scaleY(1.5)" }} />

        {/* "/" Symbol */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <span className="text-7xl font-extralight text-white/80" style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 0 40px rgba(251, 191, 36, 0.3)" }}>/</span>
        </div>

        {/* Labels */}
        <span className="absolute left-8 bottom-8 text-xs font-semibold tracking-[0.3em] uppercase text-white/60 bg-slate-950/50 backdrop-blur-sm px-3 py-2 z-10">Exterior</span>
        <span className="absolute right-8 bottom-8 text-xs font-semibold tracking-[0.3em] uppercase text-white/60 bg-slate-950/50 backdrop-blur-sm px-3 py-2 z-10">Interior</span>

        {/* Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.6)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30">
          <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.3em] uppercase text-amber-400/80 mb-6">
            <span className="w-8 h-px bg-amber-400/40" />Our Craftsmanship<span className="w-8 h-px bg-amber-400/40" />
          </span>
          <h2>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Where Quality</span>
            <span className="block mt-3 text-5xl md:text-6xl lg:text-7xl font-normal" style={{ fontFamily: "'Playfair Display', serif", background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Meets Design</span>
          </h2>
        </div>
      </section>

      {/* ================================================================= */}
      {/* STATS SECTION (GRADIENT) */}
      {/* ================================================================= */}
      <section className="relative bg-gradient-to-br from-amber-500 via-amber-500 to-amber-600 py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "2,877", label: "Homes Built" },
              { value: "2,877", label: "Happy Families" },
              { value: "$0", label: "Down Payment" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-center transition-all">
                <div className="text-4xl font-light text-white tracking-tight mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</div>
                <div className="text-sm font-semibold text-white tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* TESTIMONIALS SECTION */}
      {/* ================================================================= */}
      <section className="relative bg-slate-900 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-400 mb-6">
            <span className="w-8 h-px bg-amber-400/50" />Testimonials<span className="w-8 h-px bg-amber-400/50" />
          </span>
          <h2 className="mb-12">
            <span className="block text-4xl lg:text-5xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>What Our</span>
            <span className="block mt-1 text-4xl lg:text-5xl font-normal" style={{ fontFamily: "'Playfair Display', serif", background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Families Say</span>
          </h2>

          {/* Testimonial Card */}
          <div className="relative p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/5">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <blockquote>
              <p className="text-xl sm:text-2xl font-light text-white/90 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                "{testimonials[activeTestimonial].quote}"
              </p>
            </blockquote>
            <div className="mt-8">
              <div className="font-semibold text-white">{testimonials[activeTestimonial].author}</div>
              <div className="text-sm text-white/50">{testimonials[activeTestimonial].location}</div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all ${i === activeTestimonial ? 'w-8 bg-amber-400' : 'w-2 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* CTA SECTION */}
      {/* ================================================================= */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-400 mb-6">
                <span className="w-8 h-px bg-amber-400/50" />Start Today
              </span>
              <h2>
                <span className="block text-4xl lg:text-5xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Ready to Build Your</span>
                <span className="block mt-1 text-4xl lg:text-5xl font-normal" style={{ fontFamily: "'Playfair Display', serif", background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Dream Home?</span>
              </h2>
              <p className="mt-6 text-lg text-white/60">Take the first step toward homeownership. Our team is ready to guide you.</p>
              
              <ul className="mt-8 space-y-3">
                {["$0 down payment required", "Pre-qualification in 5 minutes", "Dedicated personal advisor"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">Get Started Today</h3>
                <p className="text-white/50 text-sm">We'll be in touch within 24 hours.</p>
              </div>
              <form className="space-y-5">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50" />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50" />
                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-4 text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2">
                  Submit Inquiry
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FOOTER */}
      {/* ================================================================= */}
      <footer className="bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="#" className="inline-flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm rotate-45" />
                  <span className="relative text-slate-950 font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>S</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>Standard Land</span>
                  <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">Development</span>
                </div>
              </a>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">Building dreams into reality since 2016. Over 2,800 families have found their perfect home.</p>
              <div className="flex items-center gap-3">
                {['Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-amber-400 hover:border-amber-400/30 transition-all">
                    <span className="text-xs">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: "Company", links: ["About Us", "Our Team", "Careers", "Contact"] },
              { title: "Homes", links: ["Available Homes", "Floor Plans", "Communities", "Gallery"] },
              { title: "Resources", links: ["How It Works", "FAQs", "Financing", "Warranty"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-white/50 hover:text-amber-400 transition-colors text-sm">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs">© 2024 Standard Land Development. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs">
              <a href="#" className="text-white/40 hover:text-white/70">Privacy Policy</a>
              <a href="#" className="text-white/40 hover:text-white/70">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </footer>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
};

export default SLDWebsitePreview;
