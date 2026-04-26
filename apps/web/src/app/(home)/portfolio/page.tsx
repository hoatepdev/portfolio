import { Suspense } from "react";

import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import config from "@/config";
import { getPortfolioPosts } from "@/lib/db/v1/portfolio";

import PortfolioListClient from "./portfolio-list-client";

const { title, about } = config;

export const metadata = {
  title: `Portfolio | ${title}`,
  description: "Read my thoughts on software development, design, and more.",
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
