export interface GallerySection {
  id: string;
  title: string;
  subtitle: string;
  photosPerPage: number;
}

export const gallerySections: GallerySection[] = [
  {
    id: "s3",
    title: "Blazers",
    subtitle: "S3 -- Nov 1998",
    photosPerPage: 24,
  },
  {
    id: "s5",
    title: "Bandits on the Rampage",
    subtitle: "S5 -- 1999-2000",
    photosPerPage: 24,
  },
  {
    id: "s7",
    title: "Beyond the Limits",
    subtitle: "S7 -- 2000-2001",
    photosPerPage: 24,
  },
  {
    id: "misc",
    title: "Miscellaneous",
    subtitle: "Events & Memories",
    photosPerPage: 24,
  },
];

/**
 * Photo file lists for each gallery section.
 *
 * These lists are generated at build time by scanning the public/photos/gallery/<section>/
 * directories. To regenerate, run the build-time script (scripts/generateGalleryManifest.ts)
 * which reads the filesystem and writes the photo arrays below.
 *
 * At runtime in a static Next.js export, we cannot do directory listing, so
 * this file serves as the single source of truth for all gallery photo paths.
 *
 * Expected directory structure:
 *   public/photos/gallery/s3/    -- ~122 photos (e.g., 100.10.jpg, 100.11.JPG, ...)
 *   public/photos/gallery/s5/    -- ~167 photos
 *   public/photos/gallery/s7/    -- ~134 photos
 *   public/photos/gallery/misc/  -- ~41 photos
 *
 * Until the manifest script is run, consume gallerySections above for metadata
 * and use the photo arrays exported from the generated manifest.
 */
