import Image from "next/image";
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
            className="group relative rounded-xl overflow-hidden border border-[--color-border-subtle] hover:border-[--color-accent]/30 transition-all duration-500 bg-gradient-to-b from-white to-[#f5f3f0]"
          >
            <Image
              src={sectionCovers[section.id]}
              alt={section.title}
              width={600}
              height={400}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900">{section.title}</h3>
              <p className="text-sm text-gray-500">{section.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
