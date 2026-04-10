import { notFound } from "next/navigation";
import Link from "next/link";
import { tours } from "@/lib/data/movies";
import { SectionHeader } from "@/components/section-header";

export function generateStaticParams() {
  return tours.map((t) => ({ tour: t.id }));
}

export default async function TourPage({ params }: { params: Promise<{ tour: string }> }) {
  const { tour: tourId } = await params;
  const tour = tours.find((t) => t.id === tourId);
  if (!tour) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <SectionHeader title={tour.title} subtitle={tour.subtitle} backHref="/movies" backLabel="All Movies" />

      <div className="space-y-3">
        {tour.parts.map((part) => (
          <Link
            key={part.id}
            href={`/movies/${tourId}/${part.id}`}
            className="flex items-center gap-4 card-glow p-5 group"
          >
            <div className="w-12 h-12 rounded-full bg-[--color-accent]/10 border border-[--color-accent]/20 text-[--color-accent] flex items-center justify-center font-bold font-[family-name:var(--font-display)] text-lg">
              {part.id}
            </div>
            <div>
              <h3 className="font-medium text-[--color-text-primary] group-hover:text-[--color-accent] transition-colors">{part.label}</h3>
            </div>
            <svg className="w-5 h-5 text-[--color-text-muted] ml-auto group-hover:text-[--color-accent] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
