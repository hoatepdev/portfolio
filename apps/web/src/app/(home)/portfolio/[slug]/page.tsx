import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { LuExternalLink, LuGithub } from "react-icons/lu";

import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import PageHeader from "@/components/page-header";
import config from "@/config";
import {
  type PortfolioMetadata,
  getPortfolioPosts,
} from "@/lib/db/v1/portfolio";
import "@/styles/blog/blog-text.css";

type tParams = Promise<{ slug: string }>;

const { about, siteURL } = config;

function getAbsoluteUrl(url: string) {
  return new URL(url, siteURL).toString();
}

export async function generateMetadata({
  params,
}: {
  params: tParams;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const posts = await getPortfolioPosts();
  const post = posts.find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    banner,
    tags,
  } = post.metadata;
  const ogImage = banner
    ? getAbsoluteUrl(banner)
    : getAbsoluteUrl("/images/avatar.avif");
  const canonical = `/portfolio/${post.slug}`;

  return {
    title,
    description,
    keywords: tags.length > 0 ? tags : undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      siteName: "Hòa T. (Thomas) Nguyen - hoatepdev | Open Source Enthusiast",
      description,
      type: "article",
      publishedTime,
      url: getAbsoluteUrl(canonical),
      locale: "en_US",
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function formatDate(date: string, dateStyle: "short" | "long" = "long") {
  return new Date(date).toLocaleString("en-us", {
    month: dateStyle === "short" ? "short" : "long",
    day: dateStyle === "long" ? "numeric" : undefined,
    year: "numeric",
  });
}

function getProjectTimeline(metadata: PortfolioMetadata) {
  if (metadata.startDate && metadata.endDate) {
    return `${formatDate(metadata.startDate, "short")} - ${formatDate(
      metadata.endDate,
      "short"
    )}`;
  }

  if (metadata.startDate) {
    return `${formatDate(metadata.startDate, "short")} - Present`;
  }

  return formatDate(metadata.publishedAt);
}

function getStatusLabel(status: PortfolioMetadata["status"]) {
  if (!status) {
    return undefined;
  }

  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const posts = await getPortfolioPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Portfolio(props: { params: tParams }) {
  const { slug } = await props.params;
  const posts = await getPortfolioPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const statusLabel = getStatusLabel(post.metadata.status);

  return (
    <div>
      <article>
        <section className="blog-text">
          <PageHeader header={`${about.preferredName}'s Portfolio`} />

          <div className="border-jet bg-eerie-black-1 mb-10 overflow-hidden rounded-2xl border shadow-lg">
            {post.metadata.banner && (
              <figure className="relative h-56 w-full overflow-hidden sm:h-72">
                <Image
                  src={post.metadata.banner}
                  alt={post.metadata.alt || `${post.metadata.title} banner`}
                  fill
                  priority
                  sizes="(max-width: 580px) 100vw, (max-width: 1250px) 75vw, 900px"
                  className="object-cover"
                />
                <div className="from-smoky-black via-smoky-black/30 absolute inset-0 bg-gradient-to-t to-transparent" />
              </figure>
            )}

            <div className="space-y-5 p-5 sm:p-7">
              <div className="flex flex-wrap gap-2">
                {post.metadata.category && (
                  <span className="border-jet bg-smoky-black text-orange-yellow-crayola rounded-full border px-3 py-1 text-xs font-medium">
                    {post.metadata.category}
                  </span>
                )}
                {statusLabel && (
                  <span className="border-jet bg-smoky-black text-light-gray rounded-full border px-3 py-1 text-xs font-medium">
                    {statusLabel}
                  </span>
                )}
              </div>

              <h1 className="title text-white-2 max-w-[760px] text-3xl font-semibold tracking-tighter sm:text-4xl">
                <MarkdownRenderer content={post.metadata.title} />
              </h1>

              <div className="text-light-gray max-w-[760px] text-base font-light leading-7">
                <MarkdownRenderer content={post.metadata.summary} />
              </div>

              <div className="text-light-gray-70 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-light-gray-70 block text-xs uppercase tracking-[0.2em]">
                    Published
                  </span>
                  <time dateTime={post.metadata.publishedAt}>
                    {formatDate(post.metadata.publishedAt)}
                  </time>
                </div>
                <div>
                  <span className="text-light-gray-70 block text-xs uppercase tracking-[0.2em]">
                    Timeline
                  </span>
                  <span>{getProjectTimeline(post.metadata)}</span>
                </div>
              </div>

              {post.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border-jet text-light-gray-70 rounded-full border px-3 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {(post.metadata.liveUrl || post.metadata.repoUrl) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {post.metadata.liveUrl && (
                    <a
                      href={post.metadata.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-border-gradient-onyx text-orange-yellow-crayola inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-lg transition-transform hover:scale-105 active:scale-95"
                    >
                      <LuExternalLink />
                      View live
                    </a>
                  )}
                  {post.metadata.repoUrl && (
                    <a
                      href={post.metadata.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="border-jet text-light-gray hover:text-orange-yellow-crayola inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors"
                    >
                      <LuGithub />
                      Source code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <MarkdownRenderer content={post.content} />
        </section>
      </article>
    </div>
  );
}
