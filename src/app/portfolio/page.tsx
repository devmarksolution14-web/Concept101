import type { Metadata } from "next";
import PortfolioShowcase from "@/components/portfolio/PortfolioShowcase";

export const metadata: Metadata = {
  title: "Portfolio: Web, Brand & Marketing Work",
  alternates: { canonical: "/portfolio" },
  description: "Selected work across web, brand, marketing, SEO, video, motion and AI automation.",
};

export default function PortfolioPage() {
  return (
    <main className="flex-1">
      <PortfolioShowcase />
    </main>
  );
}
