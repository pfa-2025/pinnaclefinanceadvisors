"use client";

import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";

import { getString } from "@/lib/public-content";
import { getVideoEmbedUrl, getVideoThumbnailUrl } from "@/lib/video-embed";
import type { GalleryItem } from "@/types";

import { FadeUp } from "@/components/animations/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContentImage } from "@/components/shared/content-image";

export function GallerySection({
  items,
  content,
}: {
  items: GalleryItem[];
  content: Record<string, unknown>;
}) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!activeItem) return undefined;

    document.body.style.overflow = "hidden";
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveItem(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  if (items.length === 0) return null;

  const trackItems = [...items, ...items];
  const duration = Math.max(items.length * 6, 24);

  return (
    <section className="section-space overflow-hidden">
      <div className="container-shell px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow={getString(content.eyebrow, "OUR SUCCESS STORIES")}
          title={getString(content.title, "Moments From Our Advisory Work.")}
          description={getString(
            content.description,
            "Explore moments from our events, client meetings, seminars, and educational sessions.",
          )}
        />
      </div>
      <div className="mt-12 overflow-hidden">
        <div
          className="animate-marquee flex w-max gap-6 px-4 pb-4 hover:[animation-play-state:paused] sm:px-6 lg:px-10"
          style={{ animationDuration: `${duration}s` }}
        >
          {trackItems.map((item, index) => (
            <GalleryTile key={`${item.id}-${index}`} item={item} onOpen={() => setActiveItem(item)} />
          ))}
        </div>
      </div>
      {activeItem ? <GalleryLightbox item={activeItem} onClose={() => setActiveItem(null)} /> : null}
    </section>
  );
}

function GalleryTile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  const thumbnailUrl = item.mediaType === "IMAGE" ? item.imageUrl : item.videoUrl ? getVideoThumbnailUrl(item.videoUrl) : null;

  return (
    <FadeUp className="shrink-0">
      <button
        type="button"
        onClick={onOpen}
        className="group relative block h-[420px] w-[300px] overflow-hidden rounded-[1.75rem] bg-primary text-left shadow-soft"
      >
        {thumbnailUrl ? (
          <ContentImage
            src={thumbnailUrl}
            alt={item.title ?? "Gallery item"}
            className="transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-hero-radial" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/10 to-transparent" />
        {item.mediaType === "VIDEO" ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary transition group-hover:scale-110">
              <Play size={20} fill="currentColor" className="ml-0.5" />
            </span>
          </div>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-5">
          {item.category ? (
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent-soft">
              {item.category}
            </p>
          ) : null}
          {item.title ? (
            <h3 className="mt-2 font-display text-2xl leading-tight tracking-[-0.04em] text-white">{item.title}</h3>
          ) : null}
        </div>
      </button>
    </FadeUp>
  );
}

function GalleryLightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  const embedUrl = item.mediaType === "VIDEO" && item.videoUrl ? getVideoEmbedUrl(item.videoUrl) : null;

  return (
    <div
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/70 p-4 backdrop-blur-md sm:p-8"
    >
      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-[1.75rem] bg-primary shadow-premium lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative aspect-square w-full bg-primary-deep lg:aspect-auto">
          {item.mediaType === "IMAGE" && item.imageUrl ? (
            <ContentImage src={item.imageUrl} alt={item.title ?? "Gallery image"} priority />
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title={item.title ?? "Gallery video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : null}
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-10">
          {item.category ? (
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-accent-soft">
              {item.category}
            </p>
          ) : null}
          {item.title ? (
            <h3 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.05em] text-white">{item.title}</h3>
          ) : null}
          {item.caption ? <p className="mt-5 text-sm leading-7 text-white/70">{item.caption}</p> : null}
          <p className="mt-8 text-[0.68rem] uppercase tracking-[0.2em] text-white/40">
            Click outside or press ESC to close
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
