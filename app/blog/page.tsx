import { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts, getFeaturedPosts } from "@/data/blog-posts";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { CONTACT_INFO } from "@/config/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CONTACT_INFO.siteUrl;

export const metadata: Metadata = {
  title: "Blog — Community Stories & News | Standard Land Development",
  description:
    "Community impact stories, educational content, and company updates from Standard Land Development. Learn about our construction projects, relief efforts, and commitment to building homes for American families in Southwest Florida.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Blog — Community Stories & News | Standard Land Development",
    description: "Community stories, educational content, and company updates from SLD.",
    url: `${siteUrl}/blog`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "SLD Blog" }],
  },
};

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Blog", url: `${siteUrl}/blog` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHero
        title="Blog & News"
        subtitle="Stories from Our Community"
        description="Stay updated with the latest news, community impact stories, and insights from Standard Land Development."
        backgroundImage="/recurses/foto-aerea.webp"
        badge="Latest Updates"
      />

      {/* Section 1 - LIGHT: Featured */}
      {featuredPosts.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 bg-white relative scroll-mt-28">
          <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 sm:mb-16">
              <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-4">
                Featured
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Featured Stories
              </h2>
              <p className="mt-2 text-slate-600 text-base sm:text-lg max-w-2xl">
                Our most important stories and updates
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 2 - DARK: All Posts */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] relative">
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16">
            <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-4">
              Articles & Updates
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              All Posts
            </h2>
            <p className="mt-2 text-white/75 text-base sm:text-lg max-w-2xl">
              Browse all our articles, press releases, and community updates
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} darkBg />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
