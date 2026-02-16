import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/data/blog-posts";
import { Container } from "@/components/ui/container";
import { ArrowRight, Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "SLD News | Standard Land Development",
  description:
    "Latest news, company updates, and press from Standard Land Development. Building affordable homes and creating opportunities for American families in Southwest Florida.",
};

/** Noticias y actualizaciones de la empresa (categorías news y company) */
const newsCategories = ["news", "company"] as const;

export default function SLDNewsPage() {
  const newsPosts = blogPosts.filter((post) =>
    newsCategories.includes(post.category as "news" | "company")
  );
  const featuredNews = newsPosts.filter((p) => p.featured).slice(0, 2);
  const restNews = newsPosts.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        title="SLD News"
        subtitle="Noticias y actualizaciones"
        description="Últimas noticias, comunicados y novedades de Standard Land Development. Construyendo oportunidades para las familias en el suroeste de Florida."
        backgroundImage="/recurses/foto-aerea.webp"
        badge="Noticias"
      />

      <section className="py-16 sm:py-20 md:py-24 bg-white relative scroll-mt-28">
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <Container className="relative z-10">
          <div className="max-w-6xl mx-auto">
            {newsPosts.length === 0 ? (
              <div className="text-center py-16 sm:py-24">
                <Newspaper className="w-16 h-16 text-slate-300 mx-auto mb-6" aria-hidden />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Próximamente</h2>
                <p className="text-slate-600 max-w-md mx-auto mb-8">
                  Estamos preparando las últimas noticias y comunicados. Mientras tanto, visita nuestro blog.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[#090040] font-semibold hover:underline"
                >
                  Ir al Blog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <>
                {featuredNews.length > 0 && (
                  <div className="mb-14">
                    <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
                      Destacado
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6">
                      Noticias destacadas
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                      {featuredNews.map((post) => (
                        <BlogCard key={post.id} post={post} featured />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6">
                    Todas las noticias
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {restNews.map((post) => (
                      <BlogCard key={post.id} post={post} darkBg={false} />
                    ))}
                  </div>
                </div>

                <div className="mt-14 pt-10 border-t border-slate-200 text-center">
                  <p className="text-slate-600 mb-4">Más historias y artículos en nuestro blog.</p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#090040] text-white px-6 py-3 font-semibold hover:bg-[#2d2c55] transition-colors"
                  >
                    Ver Blog completo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
