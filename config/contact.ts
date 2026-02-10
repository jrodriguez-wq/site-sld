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
    street: "45 Bridge St",
    city: "LaBelle",
    state: "FL",
    zip: "33935",
    full: "45 Bridge St, LaBelle, FL 33935",
    googleMaps: "https://maps.google.com/?q=45+Bridge+St,+LaBelle,+FL+33935",
  },
  /** Calendar link for scheduling calls (used on investment page and in ads). Replace with your Calendly, etc. */
  scheduleCall: process.env.NEXT_PUBLIC_SCHEDULE_CALL_URL || "https://calendly.com",
  domain: "standardlanddevelopment.com",
  siteUrl: "https://standardlanddevelopment.com",
};
