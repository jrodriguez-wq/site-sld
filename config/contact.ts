export const CONTACT_INFO = {
  contacts: [
    {
      name: "Michael",
      display: "(561) 818-4530",
      href: "tel:+15618184530",
      raw: "5618184530",
    },
    {
      name: "Nader",
      display: "(518) 536-4008",
      href: "tel:+15185364008",
      raw: "5185364008",
    },
  ],
  phone: {
    // Backwards-compatible alias used by components that still expect a single phone.
    display: "(561) 818-4530",
    href: "tel:+15618184530",
    raw: "5618184530",
  },
  email: {
    display: "contact@standardlanddevelopment.com",
    href: "mailto:contact@standardlanddevelopment.com",
    raw: "contact@standardlanddevelopment.com",
  },
  /** Where contact form submissions are sent (Resend "to"). */
  contactFormTo: process.env.CONTACT_FORM_TO_EMAIL ?? "contact@standardlanddevelopment.com",
  address: {
    street: "45 N Bridge St",
    city: "LaBelle",
    state: "FL",
    zip: "33935",
    full: "45 N Bridge St, LaBelle, FL 33935",
    googleMaps: "https://maps.google.com/?q=45+N+Bridge+St,+LaBelle,+FL+33935",
  },
  /** Related company: M.J. Newell Homes */
  mjNewellHomesUrl: "https://www.mjnewellhomes.com",
  social: {
    facebook: "https://www.facebook.com/standardlanddevelopment/",
    instagram: "https://www.instagram.com/standardlanddevelopment",
    instagramMichael: "https://www.instagram.com/michaeljnewell/",
    linkedInCompany: "https://www.linkedin.com/in/standard-land-development-846520223/",
    linkedInMichael: "https://www.linkedin.com/in/michael-j-newell-556a82248/",
  },
  /** Calendar link for scheduling calls (used on investment page and in ads). Replace with your Calendly, etc. */
  scheduleCall: process.env.NEXT_PUBLIC_SCHEDULE_CALL_URL || "https://calendly.com",
  /** Calendly inline widget URL for contact page (investors schedule a meeting). */
  calendlyInlineUrl:
    process.env.NEXT_PUBLIC_CALENDLY_INLINE_URL ||
    "https://calendly.com/contact-standardlanddevelopment/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=090040",
  domain: "standardlanddevelopment.com",
  siteUrl: "https://standardlanddevelopment.com",
};

/** True when the URL is a Calendly event (user/event), not the marketing homepage. */
export function isCalendlyEventUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host !== "calendly.com") return false;
    return parsed.pathname.split("/").filter(Boolean).length >= 2;
  } catch {
    return false;
  }
}
