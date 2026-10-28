import type { Metadata } from "next";
import AboutBeliefs from "@/components/about2/AboutBeliefs";

export const metadata: Metadata = {
  // Design-concept variant: kept out of search so it doesn't compete with the chosen page
  robots: { index: false, follow: true },
  title: "About Us",
  description: "Five things we believe, each with live proof.",
};

export default function About2Page() {
  return (
    <main className="flex-1">
      <AboutBeliefs />
    </main>
  );
}
