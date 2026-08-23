export type NavChild = {
  href: string;
  label: string;
  description?: string;
};

export type NavItem = {
  href?: string;
  label: string;
  children?: NavChild[];
};

export const SITE_NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/models", label: "Floor plans" },
  { href: "/locations", label: "Communities" },
  { href: "/commercial", label: "Commercial" },
  {
    label: "News",
    children: [
      { href: "/sld-news", label: "Company news", description: "Press and updates" },
      { href: "/blog", label: "Stories", description: "Community and construction" },
    ],
  },
];

export const SCHEDULE_HREF = "/contact";
export const SCHEDULE_LABEL = "Schedule a visit";
