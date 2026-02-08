"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { BlogPost } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  darkBg?: boolean;
}

const categoryStyles = {
  charity: "bg-red-500/20 text-red-300 border-red-500/30",
  education: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  company: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  news: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const categoryStylesLight = {
  charity: "bg-red-50 text-red-700 border-red-200",
  education: "bg-slate-100 text-slate-700 border-slate-200",
  company: "bg-slate-100 text-slate-700 border-slate-200",
  news: "bg-slate-100 text-slate-700 border-slate-200",
};

export const BlogCard = ({ post, featured = false, darkBg = false }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const categoryStyle = darkBg ? categoryStyles[post.category] : categoryStylesLight[post.category];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer",
        darkBg
          ? "bg-white/5 backdrop-blur-xl border border-white/20 hover:border-white/40 hover:shadow-xl"
          : "bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl"
      )}
    >
      {/* Image */}
      {post.image && (
        <div
          className={cn(
            "relative overflow-hidden",
            featured ? "h-56 sm:h-64 md:h-72" : "h-44 sm:h-52"
          )}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              darkBg
                ? "bg-gradient-to-t from-[#090040]/95 via-[#090040]/40 to-transparent"
                : "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            )}
          />
          <span
            className={cn(
              "absolute top-3 left-3 inline-flex px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider border",
              categoryStyle
            )}
          >
            {post.category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className={cn("p-5 sm:p-6", featured && "sm:p-8")}>
        <div className="flex items-center gap-3 text-xs font-medium mb-3">
          <span
            className={cn(
              "flex items-center gap-1.5",
              darkBg ? "text-white/60" : "text-slate-500"
            )}
          >
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDate(post.date)}
          </span>
          <span className={darkBg ? "text-white/40" : "text-slate-300"}>•</span>
          <span className={darkBg ? "text-white/60" : "text-slate-500"}>{post.author}</span>
        </div>

        <h3
          className={cn(
            "font-bold mb-3 line-clamp-2 group-hover:opacity-90 transition-opacity",
            darkBg ? "text-white" : "text-slate-900",
            featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
          )}
        >
          {post.title}
        </h3>

        <p
          className={cn(
            "leading-relaxed line-clamp-2 mb-4",
            darkBg ? "text-white/75 text-sm" : "text-slate-600 text-sm"
          )}
        >
          {post.excerpt}
        </p>

        <span
          className={cn(
            "inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3",
            darkBg ? "text-white" : "text-slate-900"
          )}
        >
          Read article
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
};
