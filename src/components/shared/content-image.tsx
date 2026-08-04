/* eslint-disable @next/next/no-img-element */

import { cn } from "@/lib/utils";

export function ContentImage({
  alt,
  className,
  priority = false,
  src,
}: {
  alt: string;
  className?: string;
  priority?: boolean;
  src: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
