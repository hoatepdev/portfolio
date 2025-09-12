import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import PageHeader from "@/components/page-header";
import config from "@/config";
import { getPortfolioPosts } from "@/lib/db/v1/portfolio";
import "@/styles/blog/blog-text.css";

type tParams = Promise<{ slug: string }>;

const { about } = config;

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
  } = post.metadata;
  const ogImage = banner
    ? `https://p.hoatepdev.site${banner}`
    : `https://p.hoatepdev.site/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      siteName: "Hòa T. (Thomas) Nguyen - hoatepdev | Open Source Enthusiast",
      description,
      type: "article",
      publishedTime,
      url: `https://p.hoatepdev.site/portfolio/${post.slug}`,
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

function formatDate(date: string) {
  noStore();
  const currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date).getTime();
  const timeDifference = Math.abs(currentDate - targetDate);
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let daysLater: number = 0;
  if (targetDate > currentDate) {
    daysLater = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

  if (daysLater > 365) {
    return `${fullDate} (${daysLater}d later)`;
  } else if (daysLater > 30) {
    const weeksAgo = Math.floor(daysLater / 7);
    return `${fullDate} (${weeksAgo}w later)`;
  } else if (daysLater > 7) {
    const monthsAgo = Math.floor(daysLater / 30);
    return `${fullDate} (${monthsAgo}mo later)`;
  } else if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

export default async function Portfolio(props: { params: tParams }) {
  const { slug } = await props.params;
  const posts = await getPortfolioPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <article>
        <section className="blog-text">
          <PageHeader header={`${about.preferredName}'s Portfolio`} />
          <h1 className="title font-text-2xl max-w-[650px] text-2xl font-semibold tracking-tighter">
            <MarkdownRenderer content={post.metadata.title} />
          </h1>
          <div className="mb-8 mt-2 flex max-w-[650px] items-center justify-between text-sm">
            <Suspense fallback={<p className="h-5" />}>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </Suspense>
          </div>
          <MarkdownRenderer content={post.content} />
        </section>
      </article>
    </div>
  );
}
