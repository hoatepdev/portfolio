"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { LuEye } from "react-icons/lu";

import FilterList from "@/components/filter/filter-list";
import FilterSelectBox from "@/components/filter/filter-select-box";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import Pagination from "@/components/pagination";
import { ProgressBarLink } from "@/components/progress-bar";

const POSTS_PER_PAGE = 6;

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

export default function PortfolioListClient({
  posts,
}: PortfolioListClientProps) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag") || "All";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const blogTags = [
    "All",
    ...Array.from(new Set(posts.map((post) => post.metadata.category ?? ""))),
  ];

  const filteredPortfolioPosts =
    selectedTag === "All"
      ? posts
      : posts.filter((post) => post.metadata.category === selectedTag);

  const totalPages = Math.ceil(filteredPortfolioPosts.length / POSTS_PER_PAGE);

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
                  priority
                  placeholder="blur"
                  loading="eager"
                  quality={50}
                  blurDataURL="https://docs.1chooo.com/images/cover-with-1chooo-com.png"
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
