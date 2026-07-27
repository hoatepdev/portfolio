"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { LuEye } from "react-icons/lu";

import FilterList from "@/components/filter/filter-list";
import FilterSelectBox from "@/components/filter/filter-select-box";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import Pagination from "@/components/pagination";
import { ProgressBarLink } from "@/components/progress-bar";
import { POSTS_PER_PAGE } from "@/lib/constants";

type PostMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  category?: string;
  banner: string;
  alt?: string;
};

interface PortfolioListClientProps {
  posts: { slug: string; metadata: PostMetadata }[];
}

const ALL_TAG = "All";

function getBlogTags(posts: PortfolioListClientProps["posts"]) {
  const categories = posts
    .map((post) => post.metadata.category)
    .filter((category): category is string => Boolean(category));

  return [ALL_TAG, ...Array.from(new Set(categories))];
}

function getSelectedTag(tag: string | null, blogTags: string[]) {
  return tag && blogTags.includes(tag) ? tag : ALL_TAG;
}

function getCurrentPage(page: string | null, totalPages: number) {
  const parsedPage = Number.parseInt(page ?? "1", 10);

  if (!Number.isFinite(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return Math.min(parsedPage, Math.max(totalPages, 1));
}

export default function PortfolioListClient({
  posts,
}: PortfolioListClientProps) {
  const searchParams = useSearchParams();
  const blogTags = getBlogTags(posts);
  const selectedTag = getSelectedTag(searchParams.get("tag"), blogTags);

  const filteredPortfolioPosts =
    selectedTag === ALL_TAG
      ? posts
      : posts.filter((post) => post.metadata.category === selectedTag);

  const totalPages = Math.ceil(filteredPortfolioPosts.length / POSTS_PER_PAGE);
  const currentPage = getCurrentPage(searchParams.get("page"), totalPages);

  const paginatedPortfolioPosts = filteredPortfolioPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <section className="projects">
      <FilterList
        path="portfolio"
        selectedTag={selectedTag}
        blogTags={blogTags}
      />
      <FilterSelectBox
        path="portfolio"
        selectedTag={selectedTag}
        blogTags={blogTags}
      />
      <ul className="project-list">
        {paginatedPortfolioPosts.map((post) => (
          <li
            key={post.slug}
            className="project-item active"
            data-category={post.metadata.category}
          >
            <ProgressBarLink
              href={`/portfolio/${post.slug}`}
              rel="noopener noreferrer"
            >
              <figure className="project-img">
                <div className="project-item-icon-box">
                  <LuEye />
                </div>
                <Image
                  src={post.metadata.banner}
                  alt={post.metadata.alt || "Portfolio post image"}
                  width={960}
                  height={540}
                  placeholder="empty"
                  quality={50}
                  sizes="(max-width: 580px) 100vw, (max-width: 1250px) 50vw, 33vw"
                />
              </figure>
              <h3 className="project-title">
                <MarkdownRenderer content={post.metadata.title} />
              </h3>
              <p className="project-category">{post.metadata.category}</p>
            </ProgressBarLink>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        selectedTag={selectedTag}
        basePath="/portfolio"
      />
    </section>
  );
}
