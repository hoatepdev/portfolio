"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { LuExternalLink, LuGithub, LuSearch, LuX } from "react-icons/lu";
import Balancer from "react-wrap-balancer";

import FilterList from "@/components/filter/filter-list";
import FilterSelectBox from "@/components/filter/filter-select-box";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import Pagination from "@/components/pagination";
import { ProgressBarLink } from "@/components/progress-bar";
import { POSTS_PER_PAGE } from "@/lib/constants";
import type { PortfolioMetadata } from "@/lib/db/v1/portfolio";

interface PortfolioListClientProps {
  posts: { slug: string; metadata: PortfolioMetadata }[];
}

const ALL_TAG = "All";
const VISIBLE_TAG_COUNT = 4;

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

function getFormattedDate(date: string) {
  return new Date(date).toLocaleDateString("en-us", {
    month: "short",
    year: "numeric",
  });
}

function getProjectDate(metadata: PortfolioMetadata) {
  if (metadata.startDate && metadata.endDate) {
    return `${getFormattedDate(metadata.startDate)} - ${getFormattedDate(
      metadata.endDate
    )}`;
  }

  if (metadata.startDate) {
    return `${getFormattedDate(metadata.startDate)} - Present`;
  }

  return getFormattedDate(metadata.publishedAt);
}

function matchesSearch(
  post: PortfolioListClientProps["posts"][number],
  q: string
) {
  if (!q) {
    return true;
  }

  const query = q.toLowerCase();
  const searchableContent = [
    post.metadata.title,
    post.metadata.summary,
    post.metadata.category,
    ...post.metadata.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableContent.includes(query);
}

export default function PortfolioListClient({
  posts,
}: PortfolioListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogTags = getBlogTags(posts);
  const selectedTag = getSelectedTag(searchParams.get("tag"), blogTags);
  const searchQuery = searchParams.get("q")?.trim() ?? "";
  const [searchValue, setSearchValue] = useState(searchQuery);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const query = useMemo(
    () => ({
      q: searchQuery || undefined,
    }),
    [searchQuery]
  );

  const filteredPortfolioPosts = posts.filter((post) => {
    const matchesCategory =
      selectedTag === ALL_TAG || post.metadata.category === selectedTag;

    return matchesCategory && matchesSearch(post, searchQuery);
  });

  const totalPages = Math.ceil(filteredPortfolioPosts.length / POSTS_PER_PAGE);
  const currentPage = getCurrentPage(searchParams.get("page"), totalPages);

  const paginatedPortfolioPosts = filteredPortfolioPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    const trimmedSearch = searchValue.trim();

    if (selectedTag !== ALL_TAG) {
      params.set("tag", selectedTag);
    }

    if (trimmedSearch) {
      params.set("q", trimmedSearch);
    }

    const search = params.toString();
    router.push(`/portfolio${search ? `?${search}` : ""}`);
  }

  return (
    <section className="projects">
      <div className="border-jet bg-eerie-black-1 mb-6 rounded-2xl border p-4 shadow-lg">
        <form
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
          onSubmit={handleSearch}
        >
          <label className="relative flex-1">
            <span className="sr-only">Search portfolio projects</span>
            <LuSearch className="text-light-gray-70 pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search projects, stacks, or keywords..."
              className="text-white-2 placeholder:text-light-gray-70 focus:border-orange-yellow-crayola border-jet bg-smoky-black w-full rounded-xl border px-11 py-3 text-sm outline-none transition-colors"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-border-gradient-onyx text-orange-yellow-crayola hover:bg-orange-yellow-crayola-dark rounded-xl px-4 py-3 text-sm font-medium shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Search
            </button>
            {(searchQuery || selectedTag !== ALL_TAG) && (
              <ProgressBarLink
                href="/portfolio"
                className="text-light-gray hover:text-orange-yellow-crayola border-jet flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors"
              >
                <LuX />
                Reset
              </ProgressBarLink>
            )}
          </div>
        </form>
      </div>

      <FilterList
        path="portfolio"
        selectedTag={selectedTag}
        blogTags={blogTags}
        query={query}
      />
      <FilterSelectBox
        path="portfolio"
        selectedTag={selectedTag}
        blogTags={blogTags}
        query={query}
      />

      {paginatedPortfolioPosts.length > 0 ? (
        <ul className="project-list">
          {paginatedPortfolioPosts.map((post) => {
            const visibleTags = post.metadata.tags.slice(0, VISIBLE_TAG_COUNT);
            const hiddenTagCount =
              post.metadata.tags.length - visibleTags.length;

            return (
              <li
                key={post.slug}
                className="project-item active"
                data-category={post.metadata.category}
              >
                <div className="bg-border-gradient-onyx before:bg-eerie-black-1 relative z-[1] h-full rounded-2xl p-px shadow-lg before:absolute before:inset-px before:-z-[1] before:rounded-[inherit]">
                  <ProgressBarLink
                    href={`/portfolio/${post.slug}`}
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <figure className="project-img mb-0 rounded-b-none">
                      <div className="project-item-icon-box">
                        <LuExternalLink />
                      </div>
                      <Image
                        src={post.metadata.banner}
                        alt={post.metadata.alt || "Portfolio project image"}
                        width={960}
                        height={540}
                        placeholder="empty"
                        quality={60}
                        sizes="(max-width: 580px) 100vw, (max-width: 1250px) 50vw, 33vw"
                      />
                    </figure>
                  </ProgressBarLink>

                  <div className="flex flex-col gap-3 p-4 sm:p-5">
                    <div className="text-light-gray-70 flex flex-wrap items-center gap-2 text-xs font-light">
                      {post.metadata.category && (
                        <span>{post.metadata.category}</span>
                      )}
                      {post.metadata.category && (
                        <span className="bg-light-gray-70 h-1 w-1 rounded-full" />
                      )}
                      <time dateTime={post.metadata.publishedAt}>
                        {getProjectDate(post.metadata)}
                      </time>
                    </div>

                    <ProgressBarLink
                      href={`/portfolio/${post.slug}`}
                      className="project-title hover:text-orange-yellow-crayola ml-0 line-clamp-2 text-xl font-semibold transition-colors"
                    >
                      <Balancer>
                        <MarkdownRenderer content={post.metadata.title} />
                      </Balancer>
                    </ProgressBarLink>

                    <div className="text-light-gray line-clamp-2 text-sm font-light leading-6">
                      <MarkdownRenderer content={post.metadata.summary} />
                    </div>

                    {visibleTags.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-2 pt-1">
                        {visibleTags.map((tag) => (
                          <span
                            key={tag}
                            className="text-light-gray-70 border-jet rounded-full border px-3 py-1 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {hiddenTagCount > 0 && (
                          <span className="text-light-gray-70 border-jet rounded-full border px-3 py-1 text-xs">
                            +{hiddenTagCount}
                          </span>
                        )}
                      </div>
                    )}

                    {(post.metadata.liveUrl || post.metadata.repoUrl) && (
                      <div className="text-orange-yellow-crayola flex flex-wrap gap-3 pt-1 text-xs font-medium">
                        {post.metadata.liveUrl && (
                          <a
                            href={post.metadata.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white-2 inline-flex items-center gap-1 transition-colors"
                          >
                            <LuExternalLink />
                            Live
                          </a>
                        )}
                        {post.metadata.repoUrl && (
                          <a
                            href={post.metadata.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white-2 inline-flex items-center gap-1 transition-colors"
                          >
                            <LuGithub />
                            Source
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="border-jet bg-eerie-black-1 rounded-2xl border p-8 text-center shadow-lg">
          <h3 className="text-white-2 text-xl font-semibold">
            No portfolio projects found
          </h3>
          <p className="text-light-gray mt-3 text-sm leading-6">
            Try a different keyword or reset the active portfolio filters.
          </p>
          <ProgressBarLink
            href="/portfolio"
            className="text-orange-yellow-crayola hover:text-white-2 mt-5 inline-flex items-center gap-2 text-sm font-medium"
          >
            <LuX />
            Clear search and filters
          </ProgressBarLink>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        selectedTag={selectedTag}
        basePath="/portfolio"
        query={query}
      />
    </section>
  );
}
