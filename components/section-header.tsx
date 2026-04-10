import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
}

export function SectionHeader({
  title,
  subtitle,
  backHref,
  backLabel,
}: SectionHeaderProps) {
  return (
    <div className="mb-10">
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          {backLabel ?? "Back"}
        </Link>
      )}
      <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-gradient tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-lg text-[--color-text-secondary]">{subtitle}</p>
      )}
    </div>
  );
}
