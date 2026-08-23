import { MetadataRoute } from "next";
import { CONTACT_INFO } from "@/config/contact";
import { blogPosts } from "@/data/blog-posts";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || CONTACT_INFO.siteUrl;
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage — highest priority
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },

    // Primary business pages — drive conversions
    { url: `${baseUrl}/models`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/commercial`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/investment`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // Information pages
    { url: `${baseUrl}/about`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`,        lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${baseUrl}/business-model`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/sld-news`,       lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${baseUrl}/blog`,           lastModified: now, changeFrequency: "weekly",  priority: 0.8 },

    // Legal / trust signals
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/help`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
