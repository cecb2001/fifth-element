export const sectionAudio: Record<string, string> = {
  home: "/audio/link.wav",
  classmates: "/audio/chariots-of-fire.mp3",
  profiles: "/audio/boyz-ii-men-hard-to-say-goodbye.mp3",
  gallery: "/audio/belinda-carlisle---heaven-is-a-place-on-earth.mp3",
  "gallery-s3": "/audio/belinda-carlisle---heaven-is-a-place-on-earth.mp3",
  "gallery-s5": "/audio/yanni---adagio-in-c-minor.mp3",
  "gallery-s7": "/audio/s7_kenny-g---the-moment.mp3",
  "gallery-misc": "/audio/belinda-carlisle---heaven-is-a-place-on-earth.mp3",
  credits: "/audio/i'll-be-there-for-you---rembrandts.mp3",
};

export function getAudioForPath(pathname: string): string | null {
  if (pathname === "/") return sectionAudio.home;
  if (pathname === "/classmates") return sectionAudio.classmates;
  if (pathname.startsWith("/classmates/")) return sectionAudio.profiles;
  if (pathname === "/gallery") return sectionAudio.gallery;
  if (pathname.startsWith("/gallery/s3")) return sectionAudio["gallery-s3"];
  if (pathname.startsWith("/gallery/s5")) return sectionAudio["gallery-s5"];
  if (pathname.startsWith("/gallery/s7")) return sectionAudio["gallery-s7"];
  if (pathname.startsWith("/gallery/misc"))
    return sectionAudio["gallery-misc"];
  if (pathname.startsWith("/credits")) return sectionAudio.credits;
  return null;
}
