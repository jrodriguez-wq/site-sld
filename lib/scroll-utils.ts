/**
 * Utility functions for handling smooth scroll with offset for sticky header
 */

export const scrollToSection = (id: string, offset: number = 120) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (href.startsWith("#")) {
    e.preventDefault();
    const id = href.substring(1);
    scrollToSection(id, 120); // 120px offset for sticky header
  }
};
