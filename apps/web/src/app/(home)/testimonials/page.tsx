import type { Metadata } from "next";

import PageHeader from "@/components/page-header";
import Testimonials from "@/components/testimonials";
import config from "@/config";

const { title, about, testimonials, siteURL, openGraph } = config;

export const metadata: Metadata = {
  title: `${testimonials.title} | ${title}`,
  description: testimonials.description,
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: `${testimonials.title} | ${title}`,
    description: testimonials.description,
    url: `${siteURL}/testimonials`,
    type: "website",
    siteName: openGraph.siteName,
    images: openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    title: `${testimonials.title} | ${title}`,
    description: testimonials.description,
    images: openGraph.images.map((image) => image.url),
  },
};

export default function TestimonialsPage() {
  return (
    <article>
      <PageHeader header={`${about.preferredName}'s Testimonials`} />
      <Testimonials
        items={testimonials.items}
        description={testimonials.description}
        variant="page"
        showViewAllLink={false}
      />
    </article>
  );
}
