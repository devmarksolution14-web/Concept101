import type { Metadata } from "next";
import ControlRoomShowcase from "@/components/portfolio/ControlRoomShowcase";

export const metadata: Metadata = {
  // Design-concept variant: kept out of search so it doesn't compete with the chosen page
  robots: { index: false, follow: true },
  title: "Portfolio",
  description: "Our work, live on the wall: web, brand, marketing, SEO, video, motion and AI automation.",
};

export default function Portfolio2Page() {
  return (
    <main className="flex-1">
      <ControlRoomShowcase />
    </main>
  );
}
