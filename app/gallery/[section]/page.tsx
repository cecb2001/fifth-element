"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { gallerySections } from "@/lib/data/gallery";
import { SectionHeader } from "@/components/section-header";
import { PhotoGrid } from "@/components/photo-grid";
import { Lightbox } from "@/components/lightbox";

export default function GallerySectionPage() {
  const params = useParams<{ section: string }>();
  const section = gallerySections.find((s) => s.id === params.section);
  const [photos, setPhotos] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/gallery/${params.section}`)
      .then((r) => r.json())
      .then((data) => setPhotos(data.photos))
      .catch(() => setPhotos([]));
  }, [params.section]);

  if (!section) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-[--color-text-muted]">Gallery section not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <SectionHeader
        title={section.title}
        subtitle={`${section.subtitle} \u2014 ${photos.length} photos`}
        backHref="/gallery"
        backLabel="All Galleries"
      />

      {photos.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[--color-accent]/30 border-t-[--color-accent] rounded-full animate-spin" />
        </div>
      ) : (
        <PhotoGrid photos={photos} onPhotoClick={setLightboxIndex} />
      )}

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
