import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/components/audio-provider";
import { LayoutShell } from "@/components/layout-shell";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fifth Elements — CEC B 2001",
  description:
    "Digital yearbook of the B Batch 1997-2001, College of Engineering Chengannur",
  openGraph: {
    title: "Fifth Elements — CEC B 2001",
    description:
      "Digital yearbook of the B Batch 1997-2001, College of Engineering Chengannur",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)]">
        <AudioProvider>
          <LayoutShell>{children}</LayoutShell>
        </AudioProvider>
      </body>
    </html>
  );
}
