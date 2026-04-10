# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modernized digital yearbook for B Batch 1997-2001, College of Engineering Chengannur (CEC). Originally a 2001 CD-ROM website built with Microsoft FrontPage, now rebuilt as a Next.js 15 app deployable on Vercel.

The original site is preserved in `Source/` and `Softwares/` for reference.

## Tech Stack

- **Next.js 15** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4**
- **next/image** for optimized photo delivery
- Deployed on **Vercel**

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Serve production build locally
```

## Architecture

### Data Layer (`lib/data/`)
All content is static TypeScript data — no database or API:
- `students.ts` — 39 student profiles (name, DOB, address, emails, photo paths)
- `gallery.ts` — Gallery section definitions (S3, S5, S7, Misc)
- `movies.ts` — Tour sections, standalone videos, fun stuff video mappings
- `credits.ts` — Makers team names and photo paths
- `audio.ts` — Section-to-audio track mapping + `getAudioForPath()` router
- `farewell.ts` — Class farewell text

### Routes (`app/`)
| Route | Content |
|---|---|
| `/` | Landing page with hero + farewell text |
| `/classmates` | Grid of 39 students with alpha jump links |
| `/classmates/[slug]` | Individual profile (SSG via `generateStaticParams`) |
| `/gallery` | Hub linking to 4 gallery sections |
| `/gallery/[section]` | Photo grid with lightbox (fetches file list from `/api/gallery/[section]`) |
| `/movies` | Hub for tours + standalone videos |
| `/movies/[tour]` | Tour part list |
| `/movies/[tour]/[part]` | Video player page |
| `/movies/masala`, `/movies/dance` | Standalone video pages |
| `/fun` | 3 fun stuff video players |
| `/credits` | Team photos + member names |
| `/api/gallery/[section]` | Server route that reads `public/photos/<section>/` directory |

### Components (`components/`)
- `navbar.tsx` — Sticky nav with music toggle, mobile hamburger
- `audio-provider.tsx` — React Context for section-based ambient audio
- `footer.tsx` — Site footer
- `student-card.tsx` — Student photo+name card for classmates grid
- `photo-grid.tsx` — Responsive thumbnail grid
- `lightbox.tsx` — Fullscreen photo viewer with keyboard/swipe nav
- `video-player.tsx` — HTML5 video wrapper
- `section-header.tsx` — Reusable page header with back link

### Static Assets (`public/`)
- `photos/passport/` — 39 passport photos
- `photos/portraits/` — 39 profile portraits
- `photos/s3|s5|s7|misc/` — ~464 gallery photos
- `photos/makers/` — 14 team photos
- `photos/ui/` — UI images (hero, section headers)
- `audio/` — 20 MP3/WAV files
- `video/` — Converted MP4s (from `scripts/convert-media.sh`)

### Scripts (`scripts/`)
- `copy-assets.sh` — Copies and normalizes assets from `Source/` to `public/`
- `convert-media.sh` — Converts Flash SWF + Windows Media DAT to MP4 (requires ffmpeg)

## Key Patterns

- All routes are statically generated except `/gallery/[section]` (reads filesystem) and `/api/gallery/[section]`
- Gallery photo lists are dynamic (API reads `public/photos/` at runtime) so new photos can be added without code changes
- Audio system uses React Context + `usePathname()` to auto-switch tracks per section
- Student data was manually extracted from `Source/addressbook.htm`
- Original `Source/` directory is untouched — the new app lives alongside it
