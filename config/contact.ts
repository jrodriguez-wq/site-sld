export const CONTACT_INFO = {
  phone: {
    display: "(561) 418-2016",
    href: "tel:+15614182016",
    raw: "5614182016",
  },
  email: {
    display: "info@standardlanddevelopment.com",
    href: "mailto:info@standardlanddevelopment.com",
    raw: "info@standardlanddevelopment.com",
  },
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
    "https://calendly.com/contact-standardlanddevelopment/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=001ada",
  domain: "standardlanddevelopment.com",
  siteUrl: "https://standardlanddevelopment.com",
};
