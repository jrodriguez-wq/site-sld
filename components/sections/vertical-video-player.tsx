"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";

interface VerticalVideo {
  id: string;
  src: string;
  poster?: string;
  title?: string;
  subtitle?: string;
}

interface VerticalVideoPlayerProps {
  videos: VerticalVideo[];
  eyebrow?: string;
  headline?: string;
  highlightedText?: string;
  description?: string;
  layout?: "side-by-side" | "carousel" | "stacked";
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  showBlurBackground?: boolean;
  theme?: "dark" | "light";
  className?: string;
}

const VideoPlayer = ({
  video,
  autoplay = false,
  muted = true,
  loop = true,
  showBlurBackground = true,
  theme = "dark",
}: {
  video: VerticalVideo;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  showBlurBackground?: boolean;
  theme?: "dark" | "light";
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const blurVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    if (videoRef.current) {
      if (autoplay) {
        videoRef.current.play().catch(() => {});
        blurVideoRef.current?.play().catch(() => {});
      }
    }
  }, [autoplay]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        blurVideoRef.current?.pause();
      } else {
        videoRef.current.play();
        blurVideoRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
      if (blurVideoRef.current) {
        blurVideoRef.current.currentTime = pos * videoRef.current.duration;
      }
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (blurVideoRef.current) {
        blurVideoRef.current.currentTime = 0;
      }
      videoRef.current.play();
      blurVideoRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
        relative aspect-[9/16] rounded-3xl overflow-hidden
        ${isDark ? "bg-slate-900" : "bg-slate-100"}
        shadow-2xl shadow-black/20
      `}
      >
        {showBlurBackground && (
          <div className="absolute inset-0 overflow-hidden">
            <video
              ref={blurVideoRef}
              src={video.src}
              poster={video.poster}
              muted
              loop={loop}
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-150 blur-3xl opacity-50"
              aria-hidden
            />
            <div
              className={`absolute inset-0 ${isDark ? "bg-[#090040]/50" : "bg-white/60"}`}
            />
          </div>
        )}

        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted={isMuted}
          loop={loop}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => !loop && setIsPlaying(false)}
          onClick={togglePlay}
          className="relative z-10 w-full h-full object-contain cursor-pointer"
          aria-label={video.title ?? "Video"}
        />

        <div
          className={`
            absolute inset-0 z-20 flex items-center justify-center
            transition-opacity duration-300
            ${isPlaying && !isHovered ? "opacity-0" : "opacity-100"}
          `}
          onClick={togglePlay}
        >
          {!isPlaying && (
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
              <Play className="w-8 h-8 text-white ml-1" fill="white" aria-hidden />
            </div>
          )}
        </div>

        <div
          className={`
            absolute bottom-0 left-0 right-0 z-30 p-4
            bg-gradient-to-t from-black/80 via-black/40 to-transparent
            transition-opacity duration-300
            ${isHovered || !isPlaying ? "opacity-100" : "opacity-0"}
          `}
        >
          <div
            className="h-1 bg-white/20 rounded-full mb-4 cursor-pointer group/progress"
            onClick={handleSeek}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Video progress"
          >
            <div
              className="h-full bg-[#D4AF37] rounded-full relative transition-all"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" aria-hidden />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" aria-hidden />
                )}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" aria-hidden />
                ) : (
                  <Volume2 className="w-5 h-5" aria-hidden />
                )}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  restart();
                }}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Restart"
              >
                <RotateCcw className="w-4 h-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        {(video.title || video.subtitle) && (
          <div
            className={`
              absolute top-0 left-0 right-0 z-30 p-4
              bg-gradient-to-b from-black/60 to-transparent
              transition-opacity duration-300
              ${isHovered ? "opacity-100" : "opacity-0"}
            `}
          >
            {video.title && (
              <h3 className="text-white font-semibold">{video.title}</h3>
            )}
            {video.subtitle && (
              <p className="text-white/70 text-sm">{video.subtitle}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const VerticalVideoPlayer = ({
  videos,
  eyebrow = "Featured Videos",
  headline = "See Our Work",
  highlightedText = "In Action",
  description,
  layout = "side-by-side",
  autoplay = false,
  muted = true,
  loop = true,
  showBlurBackground = true,
  theme = "dark",
  className = "",
}: VerticalVideoPlayerProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isDark = theme === "dark";

  return (
    <section
      id="videos"
      ref={sectionRef}
      className={`
        relative overflow-hidden py-24 sm:py-32 scroll-mt-20 sm:scroll-mt-24
        ${isDark ? "bg-[#090040]" : "bg-slate-50"}
        ${className}
      `}
      aria-labelledby="vertical-videos-heading"
    >
      {isDark && (
        <>
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        </>
      )}

      <motion.div
        className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="text-center mb-12 sm:mb-16">
          <span
            className={`
            inline-flex items-center gap-3 mb-4
            text-[11px] font-semibold tracking-[0.25em] uppercase
            ${isDark ? "text-[#D4AF37]" : "text-[#090040]"}
          `}
          >
            <span className="w-8 h-px bg-current opacity-50" />
            {eyebrow}
            <span className="w-8 h-px bg-current opacity-50" />
          </span>
          <h2 id="vertical-videos-heading">
            <span
              className={`
                block text-3xl sm:text-4xl lg:text-5xl font-light leading-tight tracking-tight
                ${isDark ? "text-white" : "text-slate-900"}
              `}
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {headline}
            </span>
            {highlightedText && (
              <span
                className="block mt-1 text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight"
                style={{
                  fontFamily: "var(--font-serif)",
                  background:
                    "linear-gradient(135deg, #D4AF37 0%, #f5e6b3 50%, #c9a227 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {highlightedText}
              </span>
            )}
          </h2>
          {description && (
            <p
              className={`mt-4 text-lg max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}
            >
              {description}
            </p>
          )}
        </div>

        {layout === "side-by-side" && (
          <div
            className={`
              grid gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto
              ${videos.length === 1 ? "grid-cols-1 max-w-sm" : videos.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}
            `}
          >
            {videos.map((video) => (
              <div key={video.id}>
                <VideoPlayer
                  video={video}
                  autoplay={autoplay}
                  muted={muted}
                  loop={loop}
                  showBlurBackground={showBlurBackground}
                  theme={theme}
                />
              </div>
            ))}
          </div>
        )}

        {layout === "carousel" && (
          <div className="max-w-sm mx-auto">
            <VideoPlayer
              video={videos[activeIndex]}
              autoplay={autoplay}
              muted={muted}
              loop={loop}
              showBlurBackground={showBlurBackground}
              theme={theme}
            />

            {videos.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`
                      h-2 rounded-full transition-all duration-300
                      ${index === activeIndex ? "w-8 bg-[#D4AF37]" : `w-2 ${isDark ? "bg-white/20 hover:bg-white/40" : "bg-slate-300 hover:bg-slate-400"}`}
                    `}
                    aria-label={`Go to video ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {layout === "stacked" && (
          <div className="space-y-8 max-w-sm mx-auto">
            {videos.map((video, index) => (
              <div key={video.id}>
                <VideoPlayer
                  video={video}
                  autoplay={autoplay && index === 0}
                  muted={muted}
                  loop={loop}
                  showBlurBackground={showBlurBackground}
                  theme={theme}
                />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export { VerticalVideoPlayer, VideoPlayer };
export type { VerticalVideoPlayerProps, VerticalVideo };
