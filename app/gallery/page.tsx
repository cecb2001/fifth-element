import Link from "next/link";
import { gallerySections } from "@/lib/data/gallery";
import { SectionHeader } from "@/components/section-header";

const sectionCovers: Record<string, string> = {
  s3: "/photos/ui/blazers.jpg",
  s5: "/photos/ui/bandits.jpg",
  s7: "/photos/ui/beyondthelimits.jpg",
  misc: "/photos/ui/gallery.jpg",
};

export default function GalleryPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <SectionHeader title="Photo Gallery" subtitle="460+ photos from four years of campus life" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gallerySections.map((section) => (
          <Link
            key={section.id}
            href={`/gallery/${section.id}`}
            className="group relative rounded-xl overflow-hidden aspect-[16/10] border border-[--color-border-subtle] hover:border-[--color-accent]/30 transition-all duration-500"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${sectionCovers[section.id]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">{section.title}</h3>
              <p className="text-sm text-[--color-accent-light]/70">{section.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
