import Link from "next/link";
import { tours, standaloneVideos } from "@/lib/data/movies";
import { SectionHeader } from "@/components/section-header";

export default function MoviesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <SectionHeader title="Movies & Tours" subtitle="Video memories from campus life" />

      <h2 className="text-xs font-medium text-[--color-text-muted] uppercase tracking-widest mb-4">Campus Tours</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
        {tours.map((tour) => (
          <Link key={tour.id} href={`/movies/${tour.id}`} className="card-glow p-6 group">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[--color-accent] group-hover:text-[--color-accent-light] transition-colors mb-1">{tour.title}</h3>
            <p className="text-sm text-[--color-text-muted] mb-3">{tour.subtitle}</p>
            <p className="text-xs text-[--color-border-accent]/50">{tour.parts.length} parts</p>
          </Link>
        ))}
      </div>

      <h2 className="text-xs font-medium text-[--color-text-muted] uppercase tracking-widest mb-4">Standalone Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {standaloneVideos.map((video) => (
          <Link key={video.id} href={`/movies/${video.id}`} className="card-glow p-6 group">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[--color-accent] group-hover:text-[--color-accent-light] transition-colors">{video.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
