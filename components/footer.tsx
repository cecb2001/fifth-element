import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[--color-border-subtle] py-10 text-center text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3">
        <p className="font-[family-name:var(--font-display)] text-lg text-[--color-text-primary]">
          B Batch 1997&ndash;2001
        </p>
        <p className="text-[--color-text-muted] text-xs tracking-widest uppercase">
          College of Engineering, Chengannur
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link
            href="/credits"
            className="text-[--color-accent-dim] hover:text-[--color-accent] transition-colors"
          >
            The Makers
          </Link>
          <span className="text-[--color-border-subtle]">&middot;</span>
          <a
            href="mailto:cecb2001@yahoogroups.com"
            className="text-[--color-text-muted] hover:text-[--color-text-secondary] transition-colors"
          >
            cecb2001@yahoogroups.com
          </a>
        </div>
      </div>
    </footer>
  );
}
