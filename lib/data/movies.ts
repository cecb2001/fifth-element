export interface TourSection {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  parts: { id: string; label: string; video: string }[];
}

export interface StandaloneVideo {
  id: string;
  title: string;
  video: string;
  coverImage: string;
}

export const tours: TourSection[] = [
  {
    id: "s3-tour",
    title: "Blazers",
    subtitle: "The time when our friendship grew and blossomed",
    coverImage: "/photos/ui/blazers.jpg",
    parts: [
      { id: "1", label: "Part 1", video: "/video/s31.mp4" },
      { id: "2", label: "Part 2", video: "/video/s32.mp4" },
      { id: "3", label: "Part 3", video: "/video/s33.mp4" },
    ],
  },
  {
    id: "s5-tour",
    title: "Bandits on the Rampage",
    subtitle: "When we ruled the campus",
    coverImage: "/photos/ui/bandits.jpg",
    parts: [
      { id: "1", label: "Part 1", video: "/video/s51.mp4" },
      { id: "2", label: "Part 2", video: "/video/s52.mp4" },
      { id: "3", label: "Part 3", video: "/video/s53.mp4" },
      { id: "4", label: "Part 4", video: "/video/s54.mp4" },
    ],
  },
  {
    id: "s7-tour",
    title: "Beyond the Limits",
    subtitle: "The final chapter",
    coverImage: "/photos/ui/beyondthelimits.jpg",
    parts: [
      { id: "1", label: "Part 1", video: "/video/s71.mp4" },
      { id: "2", label: "Part 2", video: "/video/s72.mp4" },
      { id: "3", label: "Part 3", video: "/video/s73.mp4" },
    ],
  },
];

export const standaloneVideos: StandaloneVideo[] = [
  {
    id: "masala",
    title: "Masala Mix",
    video: "/video/masala.mp4",
    coverImage: "/photos/ui/masala.jpg",
  },
  {
    id: "dance",
    title: "Dance",
    video: "/video/dance.mp4",
    coverImage: "/photos/ui/poetry.jpg",
  },
];

export const funStuff = [
  { id: "1", label: "Part 1", video: "/video/fun1.mp4" },
  { id: "2", label: "Part 2", video: "/video/fun2.mp4" },
  { id: "3", label: "Part 3", video: "/video/fun3.mp4" },
];
