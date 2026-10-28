import type { Metadata } from "next";
import AboutShowcase from "@/components/about/AboutShowcase";

export const metadata: Metadata = {
  // Design-concept variant: kept out of search so it doesn't compete with the chosen page
  robots: { index: false, follow: true },
  title: "About Us",
  description: "Meet the team and walk around the studio.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutShowcase />
    </main>
  );
}
