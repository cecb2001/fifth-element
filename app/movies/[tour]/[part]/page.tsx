import { notFound } from "next/navigation";
import Link from "next/link";
import { tours } from "@/lib/data/movies";
import { SectionHeader } from "@/components/section-header";
import { VideoPlayer } from "@/components/video-player";

export function generateStaticParams() {
  return tours.flatMap((t) => t.parts.map((p) => ({ tour: t.id, part: p.id })));
}

export default async function TourPartPage({ params }: { params: Promise<{ tour: string; part: string }> }) {
  const { tour: tourId, part: partId } = await params;
  const tour = tours.find((t) => t.id === tourId);
  if (!tour) notFound();
  const partIndex = tour.parts.findIndex((p) => p.id === partId);
  if (partIndex === -1) notFound();

  const part = tour.parts[partIndex];
  const prev = partIndex > 0 ? tour.parts[partIndex - 1] : null;
  const next = partIndex < tour.parts.length - 1 ? tour.parts[partIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <SectionHeader title={`${tour.title} \u2014 ${part.label}`} backHref={`/movies/${tourId}`} backLabel={tour.title} />
      <VideoPlayer src={part.video} title={`${tour.title} ${part.label}`} />
      <div className="flex justify-between mt-8">
        {prev ? (
          <Link href={`/movies/${tourId}/${prev.id}`} className="text-sm text-[--color-text-muted] hover:text-[--color-accent] flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {prev.label}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/movies/${tourId}/${next.id}`} className="text-sm text-[--color-text-muted] hover:text-[--color-accent] flex items-center gap-1 transition-colors">
            {next.label}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
