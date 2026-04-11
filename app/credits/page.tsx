import Image from "next/image";
import { creditsTeam, creditsSpecialThanks, creditsPhotos } from "@/lib/data/credits";
import { SectionHeader } from "@/components/section-header";

export default function CreditsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <SectionHeader title="The Makers" subtitle="The team behind this yearbook" />

      <div className="overflow-x-auto pb-4 mb-14 -mx-6 px-6">
        <div className="flex gap-3" style={{ width: "max-content" }}>
          {creditsPhotos.map((photo, i) => (
            <div key={i} className="rounded-xl border border-[--color-border-subtle] flex-shrink-0 group bg-[--color-surface-raised]">
              <Image
                src={photo}
                alt={`Makers photo ${i + 1}`}
                width={400}
                height={300}
                className="w-auto h-48 md:h-56 object-contain rounded-xl"
                sizes="400px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card-glow p-8">
        <h2 className="text-xs font-medium text-[--color-text-muted] uppercase tracking-widest mb-6">Team Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {creditsTeam.map((name) => (
            <div key={name} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-[--color-surface]/60">
              <div className="w-1.5 h-1.5 rounded-full bg-[--color-accent]" />
              <span className="text-[--color-text-primary]">{name}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[--color-border-subtle]">
          <p className="text-[--color-text-muted] text-sm">
            Special thanks to{" "}
            <span className="text-[--color-accent] font-medium">{creditsSpecialThanks}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
