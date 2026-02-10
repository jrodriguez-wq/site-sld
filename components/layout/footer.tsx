import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { CONTACT_INFO } from "@/config/contact";
import { 
  FaFacebook, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook", external: true },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn", external: true },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter", external: true },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", external: true },
  ];

  const footerLinks = {
    company: [
      { href: "/about", label: "About Us" },
      { href: "/locations", label: "Locations" },
      { href: "/business-model", label: "Our Mission" },
      { href: "/investment", label: "Cash Program" },
      { href: "/programs", label: "Rent to Own" },
      { href: "/contact", label: "Contact" },
    ],
    programs: [
      { href: "/investment", label: "1st Position Lender" },
      { href: "/programs", label: "Rent to Own Program" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  };

  return (
    <footer className="border-t bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2d2c55] rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 py-12 sm:py-16 md:py-20 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logos/sld-blanco.png"
                alt="SLD Logo"
                width={160}
                height={64}
                className="h-14 sm:h-16 w-auto"
              />
            </div>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
              Standard Land Development - Creating the opportunity of home ownership for American Families. Building affordable homes in Southwest Florida since 2016.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-sm sm:text-base font-semibold italic text-[#D4AF37] mb-1">
                &quot;We Build so American Families can OWN the American Dream, NOT rent the American Dream&quot;
              </p>
              <p className="text-xs text-white/70">— Michael J. Newell, CEO</p>
            </div>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="text-white/70 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110 cursor-pointer"
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={true}
                    className="text-sm sm:text-base text-white/80 hover:text-[#D4AF37] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                  >
                    <FaArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs & Legal */}
          <div className="space-y-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-4">Programs</h4>
              <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={true}
                    className="text-sm sm:text-base text-white/80 hover:text-[#D4AF37] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                  >
                    <FaArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              </ul>
            </div>
            <div className="pt-6">
              <h4 className="text-base sm:text-lg font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={true}
                    className="text-sm sm:text-base text-white/80 hover:text-[#D4AF37] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                  >
                    <FaArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              </ul>
            </div>
          </div>

          {/* Contact & Stats */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-4 text-sm sm:text-base text-white/80">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="h-5 w-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div>
                  <Link
                    href={CONTACT_INFO.address.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
                  >
                    <div className="font-semibold">{CONTACT_INFO.address.street}</div>
                    <div className="text-white/70">{CONTACT_INFO.address.city}, {CONTACT_INFO.address.state} {CONTACT_INFO.address.zip}</div>
                  </Link>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="h-5 w-5 text-[#D4AF37] flex-shrink-0" />
                <Link
                  href={CONTACT_INFO.phone.href}
                  className="hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
                >
                  {CONTACT_INFO.phone.display}
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="h-5 w-5 text-[#D4AF37] flex-shrink-0" />
                <Link
                  href={CONTACT_INFO.email.href}
                  className="hover:text-[#D4AF37] transition-all duration-300 break-all cursor-pointer"
                >
                  {CONTACT_INFO.email.display}
                </Link>
              </li>
            </ul>
            
            <div className="pt-6 border-t border-white/20">
              <div className="text-xs sm:text-sm font-bold text-[#D4AF37] mb-3">Our Impact</div>
              <div className="space-y-2 text-xs sm:text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  <span>1,500+ Homes Built</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  <span>1,500+ Happy Families</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  <span>$0 Down Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/70">
            <p>
              © {currentYear} Standard Land Development. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="/privacy"
                prefetch={true}
                className="hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
              >
                Privacy
              </Link>
              <Link 
                href="/terms"
                prefetch={true}
                className="hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
