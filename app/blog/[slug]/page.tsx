import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getBlogPostBySlug, blogPosts } from "@/data/blog-posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Standard Land Development",
    };
  }

  return {
    title: `${post.title} | SLD Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

const categoryStyles = {
  charity: "bg-red-50 text-red-700 border-red-200",
  education: "bg-slate-100 text-slate-700 border-slate-200",
  company: "bg-slate-100 text-slate-700 border-slate-200",
  news: "bg-slate-100 text-slate-700 border-slate-200",
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ colorScheme: "light" }}>
      {/* Hero */}
      <header className="relative min-h-[320px] sm:min-h-[400px] md:min-h-[480px]">
        <div className="absolute inset-0 z-0">
          {post.image ? (
            <>
              <div className="absolute inset-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="100vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/40" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
          )}
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-24 flex flex-col gap-8">
          {/* Top row: Back link only */}
          <div className="flex-shrink-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors py-1"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Blog
            </Link>
          </div>

          {/* Content block: Badge + Title + Meta */}
          <div className="flex flex-col gap-4 mt-auto">
            <span
              className={cn(
                "inline-flex w-fit px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border",
                categoryStyles[post.category]
              )}
            >
              {post.category}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" aria-hidden="true" />
              {post.author}
            </span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content - Fondo blanco, texto oscuro explícito */}
      <article className="bg-white text-slate-700">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div
            className="blog-content text-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags.length > 0 && (
            <div className="mt-14 pt-8 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to All Posts
            </Link>
          </div>
        </div>
      </article>

    </div>
  );
}
