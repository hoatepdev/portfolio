import type { MetadataRoute } from "next";

import config from "@/config";
import { getPortfolioPosts } from "@/lib/db/v1/portfolio";
import { getBlogPosts } from "@/lib/db/v1/post";

const { siteURL } = config;

function mapPostsToSitemap(
  posts: { metadata: { publishedAt: string }; slug: string }[],
  prefix: string
) {
  return posts.map((post) => ({
    url: `${siteURL}/${prefix}/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogPosts();
  const blogMaps = mapPostsToSitemap(blogs, "post");

  const portfolios = await getPortfolioPosts();
  const portfolioMaps = mapPostsToSitemap(portfolios, "portfolio");

  const routes = ["", "/resume", "/portfolio", "/post", "/contact"].map(
    (route) => ({
      url: `${siteURL}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    })
  );

  return [...routes, ...blogMaps, ...portfolioMaps];
}
