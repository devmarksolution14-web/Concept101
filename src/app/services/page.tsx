import type { Metadata } from "next";
import ServicesShowcase from "@/components/services/ServicesShowcase";

export const metadata: Metadata = {
  title: "Digital Marketing, Web & Design Services in Nepal",
  description: "Web development, brand design, digital marketing, SEO, graphic design, video, motion graphics and AI automation from one Kathmandu studio.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <ServicesShowcase />
    </main>
  );
}
