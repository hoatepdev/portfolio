"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Balancer from "react-wrap-balancer";

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

interface PostListClientProps {
  posts: { slug: string; metadata: PostMetadata }[];
}

const ALL_TAG = "All";

function getBlogTags(posts: PostListClientProps["posts"]) {
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

export default function PostListClient({ posts }: PostListClientProps) {
  const searchParams = useSearchParams();
  const blogTags = getBlogTags(posts);
  const selectedTag = getSelectedTag(searchParams.get("tag"), blogTags);

  const filteredBlogs =
    selectedTag === ALL_TAG
      ? posts
      : posts.filter((post) => post.metadata.category === selectedTag);

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const currentPage = getCurrentPage(searchParams.get("page"), totalPages);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <section className="blog-posts">
      <FilterList path="post" selectedTag={selectedTag} blogTags={blogTags} />
      <FilterSelectBox
        path="post"
        selectedTag={selectedTag}
        blogTags={blogTags}
      />
      <ul className="blog-posts-list">
        {paginatedBlogs.map((post) => (
          <li
            key={post.slug}
            className="blog-post-item active"
            data-category={post.metadata.category}
          >
            <ProgressBarLink
              href={`/post/${post.slug}`}
              rel="noopener noreferrer"
            >
              <figure className="blog-banner-box">
                <Image
                  src={post.metadata.banner}
                  alt={post.metadata.alt || "Blog post image"}
                  width={1600}
                  height={900}
                  placeholder="empty"
                  sizes="(max-width: 580px) 100vw, (max-width: 1250px) 50vw, 33vw"
                />
              </figure>
              <div className="blog-content">
                <div className="blog-meta">
                  <p className="blog-category">{post.metadata.category}</p>
                  <span className="dot"></span>
                  <time dateTime={post.metadata.publishedAt}>
                    {new Date(post.metadata.publishedAt).toLocaleDateString(
                      "en-us",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </time>
                </div>
                <h3 className="text-white-2 hover:text-orange-yellow-crayola text-2xl font-semibold leading-[1.3] transition-all">
                  <Balancer>
                    <MarkdownRenderer content={post.metadata.title} />
                  </Balancer>
                </h3>
                <div className="text-light-gray text-s line-clamp-2 overflow-hidden font-light leading-6">
                  <MarkdownRenderer content={post.metadata.summary} />
                </div>
              </div>
            </ProgressBarLink>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        selectedTag={selectedTag}
        basePath="/post"
      />
    </section>
  );
}
