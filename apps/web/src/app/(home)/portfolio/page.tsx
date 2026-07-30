import type { Metadata } from "next";
import { Suspense } from "react";

import PortfolioListClient from "./portfolio-list-client";

import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import config from "@/config";
import { getPortfolioPosts } from "@/lib/db/v1/portfolio";


const { title, about, siteURL, openGraph } = config;

const description =
  "Explore selected web apps, full-stack platforms, developer tools, and experiments built by Hoà T. (Thomas) Nguyen.";

export const metadata: Metadata = {
  title: `Portfolio | ${title}`,
  description,
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: `Portfolio | ${title}`,
    description,
    url: `${siteURL}/portfolio`,
    type: "website",
    siteName: openGraph.siteName,
    images: openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    title: `Portfolio | ${title}`,
    description,
    images: openGraph.images.map((image) => image.url),
  },
};

export default async function Portfolio() {
  const allPortfolioPosts = await getPortfolioPosts();
  const posts = allPortfolioPosts.map(({ slug, metadata }) => ({
    slug,
    metadata,
  }));

  return (
    <article>
      <PageHeader header={`${about.preferredName}'s Portfolio`} />

      <Suspense fallback={<Loading />}>
        <PortfolioListClient posts={posts} />
      </Suspense>
    </article>
  );
}
