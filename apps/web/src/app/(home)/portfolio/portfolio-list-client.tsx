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
import type { PortfolioMetadata, PortfolioStatus } from "@/lib/db/v1/portfolio";
import {
  ALL_LISTING_TAG,
  getCurrentListingPage,
  getListingHref,
  getSelectedListingTag,
} from "@/lib/listing-query";
import { getSearchTokens, normalizeSearchText } from "@/lib/search";

interface PortfolioListClientProps {
  posts: { slug: string; metadata: PortfolioMetadata; searchText: string }[];
}

type PortfolioSort = "newest" | "oldest" | "title-asc" | "title-desc";

const VISIBLE_TAG_COUNT = 4;
const PORTFOLIO_STATUSES: PortfolioStatus[] = [
  "completed",
  "in-progress",
  "archived",
];
const PORTFOLIO_SORTS: PortfolioSort[] = [
  "newest",
  "oldest",
  "title-asc",
  "title-desc",
];
const STATUS_LABELS: Record<PortfolioStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  archived: "Archived",
};
const SORT_LABELS: Record<PortfolioSort, string> = {
  newest: "Newest",
  oldest: "Oldest",
  "title-asc": "Title A-Z",
  "title-desc": "Title Z-A",
};

function getBlogTags(posts: PortfolioListClientProps["posts"]) {
  const categories = posts
    .map((post) => post.metadata.category)
    .filter((category): category is string => Boolean(category));

  return [ALL_LISTING_TAG, ...Array.from(new Set(categories))];
}

function getSelectedStatus(status: string | null) {
  return status && PORTFOLIO_STATUSES.includes(status as PortfolioStatus)
    ? (status as PortfolioStatus)
    : undefined;
}

function getSelectedSort(sort: string | null) {
  return sort && PORTFOLIO_SORTS.includes(sort as PortfolioSort)
    ? (sort as PortfolioSort)
    : undefined;
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

function getTimestamp(date: string) {
  const timestamp = new Date(date).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function getFieldSearchText(metadata: PortfolioMetadata) {
  return {
    title: normalizeSearchText(metadata.title),
    summary: normalizeSearchText(metadata.summary),
    meta: normalizeSearchText(
      [metadata.category, ...metadata.tags, metadata.status]
        .filter(Boolean)
        .join(" ")
    ),
  };
}

function matchesSearch(
  post: PortfolioListClientProps["posts"][number],
  tokens: string[]
) {
  if (!tokens.length) {
    return true;
  }

  return tokens.every((token) => post.searchText.includes(token));
}

function getRelevanceScore(
  post: PortfolioListClientProps["posts"][number],
  searchQuery: string,
  tokens: string[]
) {
  if (!tokens.length) {
    return 0;
  }

  const normalizedQuery = normalizeSearchText(searchQuery);
  const fields = getFieldSearchText(post.metadata);
  let score = 0;

  if (fields.title.includes(normalizedQuery)) score += 80;
  if (fields.meta.includes(normalizedQuery)) score += 50;
  if (fields.summary.includes(normalizedQuery)) score += 30;

  tokens.forEach((token) => {
    if (fields.title.includes(token)) score += 12;
    if (fields.meta.includes(token)) score += 8;
    if (fields.summary.includes(token)) score += 5;
    if (post.searchText.includes(token)) score += 1;
  });

  return score;
}

function sortPosts(
  posts: PortfolioListClientProps["posts"],
  sort: PortfolioSort | undefined,
  searchQuery: string,
  tokens: string[]
) {
  return [...posts].sort((a, b) => {
    if (!sort && tokens.length) {
      const relevanceDiff =
        getRelevanceScore(b, searchQuery, tokens) -
        getRelevanceScore(a, searchQuery, tokens);

      if (relevanceDiff !== 0) {
        return relevanceDiff;
      }
    }

    if (sort === "oldest") {
      return (
        getTimestamp(a.metadata.publishedAt) -
        getTimestamp(b.metadata.publishedAt)
      );
    }

    if (sort === "title-asc") {
      return a.metadata.title.localeCompare(b.metadata.title);
    }

    if (sort === "title-desc") {
      return b.metadata.title.localeCompare(a.metadata.title);
    }

    return (
      getTimestamp(b.metadata.publishedAt) -
      getTimestamp(a.metadata.publishedAt)
    );
  });
}

export default function PortfolioListClient({
  posts,
}: PortfolioListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogTags = getBlogTags(posts);
  const selectedTag = getSelectedListingTag(searchParams.get("tag"), blogTags);
  const selectedStatus = getSelectedStatus(searchParams.get("status"));
  const selectedSort = getSelectedSort(searchParams.get("sort"));
  const searchQuery = searchParams.get("q")?.trim() ?? "";
  const searchTokens = useMemo(
    () => getSearchTokens(searchQuery),
    [searchQuery]
  );
  const [searchValue, setSearchValue] = useState(searchQuery);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const query = useMemo(
    () => ({
      q: searchQuery || undefined,
      tag: selectedTag !== ALL_LISTING_TAG ? selectedTag : undefined,
      status: selectedStatus,
      sort: selectedSort,
    }),
    [searchQuery, selectedSort, selectedStatus, selectedTag]
  );

  const filterQuery = useMemo(
    () => ({
      q: searchQuery || undefined,
      status: selectedStatus,
      sort: selectedSort,
    }),
    [searchQuery, selectedSort, selectedStatus]
  );

  const filteredPortfolioPosts = useMemo(() => {
    const filteredPosts = posts.filter((post) => {
      const matchesCategory =
        selectedTag === ALL_LISTING_TAG ||
        post.metadata.category === selectedTag;
      const matchesStatus =
        !selectedStatus || post.metadata.status === selectedStatus;

      return (
        matchesCategory && matchesStatus && matchesSearch(post, searchTokens)
      );
    });

    return sortPosts(filteredPosts, selectedSort, searchQuery, searchTokens);
  }, [
    posts,
    searchQuery,
    searchTokens,
    selectedSort,
    selectedStatus,
    selectedTag,
  ]);

  const totalPages = Math.ceil(filteredPortfolioPosts.length / POSTS_PER_PAGE);
  const currentPage = getCurrentListingPage(
    searchParams.get("page"),
    totalPages
  );

  const paginatedPortfolioPosts = filteredPortfolioPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  function pushPortfolioQuery(params: Record<string, string | undefined>) {
    router.push(getListingHref({ basePath: "/portfolio", query: params }));
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    pushPortfolioQuery({
      ...query,
      q: searchValue.trim() || undefined,
    });
  }

  function handleStatusChange(status: string) {
    pushPortfolioQuery({
      ...query,
      status: status || undefined,
    });
  }

  function handleSortChange(sort: string) {
    pushPortfolioQuery({
      ...query,
      sort: sort || undefined,
    });
  }

  const hasActiveFilters = Boolean(
    searchQuery ||
      selectedTag !== ALL_LISTING_TAG ||
      selectedStatus ||
      selectedSort
  );
  const resultLabel =
    filteredPortfolioPosts.length === 1 ? "project" : "projects";
  const activeDescriptions = [
    searchQuery ? `matching “${searchQuery}”` : undefined,
    selectedTag !== ALL_LISTING_TAG ? `in ${selectedTag}` : undefined,
    selectedStatus ? `marked ${STATUS_LABELS[selectedStatus]}` : undefined,
  ].filter(Boolean);

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
            {hasActiveFilters && (
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

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-light-gray-70 flex flex-col gap-2 text-xs uppercase tracking-wider">
            Status
            <select
              value={selectedStatus ?? ""}
              onChange={(event) => handleStatusChange(event.target.value)}
              className="text-white-2 focus:border-orange-yellow-crayola border-jet bg-smoky-black rounded-xl border px-4 py-3 text-sm normal-case outline-none transition-colors"
            >
              <option value="">All statuses</option>
              {PORTFOLIO_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </label>

          <label className="text-light-gray-70 flex flex-col gap-2 text-xs uppercase tracking-wider">
            Sort
            <select
              value={selectedSort ?? ""}
              onChange={(event) => handleSortChange(event.target.value)}
              className="text-white-2 focus:border-orange-yellow-crayola border-jet bg-smoky-black rounded-xl border px-4 py-3 text-sm normal-case outline-none transition-colors"
            >
              <option value="">
                {searchQuery ? "Best match" : SORT_LABELS.newest}
              </option>
              {searchQuery && (
                <option value="newest">{SORT_LABELS.newest}</option>
              )}
              <option value="oldest">{SORT_LABELS.oldest}</option>
              <option value="title-asc">{SORT_LABELS["title-asc"]}</option>
              <option value="title-desc">{SORT_LABELS["title-desc"]}</option>
            </select>
          </label>
        </div>
      </div>

      <FilterList
        path="portfolio"
        selectedTag={selectedTag}
        blogTags={blogTags}
        query={filterQuery}
      />
      <FilterSelectBox
        path="portfolio"
        selectedTag={selectedTag}
        blogTags={blogTags}
        query={filterQuery}
      />

      <p className="text-light-gray-70 mb-5 text-sm">
        Showing {filteredPortfolioPosts.length} {resultLabel}
        {activeDescriptions.length > 0
          ? ` ${activeDescriptions.join(" ")}.`
          : "."}
      </p>

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
                <div className="project-card bg-border-gradient-onyx before:bg-eerie-black-1 relative z-[1] h-full rounded-2xl p-px shadow-lg before:absolute before:inset-px before:-z-[1] before:rounded-[inherit]">
                  <ProgressBarLink
                    href={`/portfolio/${post.slug}`}
                    rel="noopener noreferrer"
                    className="project-image-link group block"
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
                      className="project-title project-title-link hover:text-orange-yellow-crayola ml-0 line-clamp-2 text-xl font-semibold transition-colors"
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
        basePath="/portfolio"
        query={query}
      />
    </section>
  );
}
