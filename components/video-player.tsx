"use client";

import { useState } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {title && (
        <h3 className="text-lg font-medium text-[--color-text-secondary] mb-3">{title}</h3>
      )}
      <div className="rounded-xl overflow-hidden border border-[--color-border-subtle] bg-black/50">
        {hasError ? (
          <div className="flex items-center justify-center h-64 text-[--color-text-muted] text-sm">
            Video not yet available
          </div>
        ) : (
          <video
            controls
            preload="metadata"
            poster={poster}
            onError={() => setHasError(true)}
            className="w-full"
          >
            <source src={src} />
          </video>
        )}
      </div>
    </div>
  );
}
