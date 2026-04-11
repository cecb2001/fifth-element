"use client";

import Image from "next/image";

interface PhotoGridProps {
  photos: string[];
  onPhotoClick: (index: number) => void;
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {photos.map((photo, index) => (
        <button
          key={photo}
          type="button"
          onClick={() => onPhotoClick(index)}
          className="group overflow-hidden rounded-lg bg-[--color-surface-raised] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent] focus-visible:ring-offset-2 focus-visible:ring-offset-[--color-surface]"
        >
          <div className="relative aspect-[4/3] bg-gradient-to-b from-[#e8e4e0] to-[#c8c4bf] flex items-center justify-center">
            <Image
              src={photo}
              alt={`Photo ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
              className="object-contain transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
          </div>
        </button>
      ))}
    </div>
  );
}
