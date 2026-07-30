import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

import { normalizeSearchText, stripMdxToSearchableText } from "@/lib/search";

export type PortfolioStatus = "completed" | "in-progress" | "archived";

export type PortfolioMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  category?: string;
  banner: string;
  alt?: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  tags: string[];
  status?: PortfolioStatus;
  repoUrl?: string;
  liveUrl?: string;
};

type RawPortfolioMetadata = Record<string, unknown>;

const PORTFOLIO_STATUSES: PortfolioStatus[] = [
  "completed",
  "in-progress",
  "archived",
];

export const getPortfolioPosts = async () => {
  const postsDirectory = path.join(process.cwd(), "src/contents/portfolios");

  // Use Promise.all to read files concurrently
  const fileNames = await fs.readdir(postsDirectory);
  const mdxFiles = fileNames.filter(
    (file) => file.endsWith(".mdx") || file.endsWith(".md")
  );

  const posts = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContent = await fs.readFile(filePath, "utf-8");

      const { metadata, content } = parseFrontmatter(fileContent);
      const slug = path.basename(fileName, path.extname(fileName));

      return {
        metadata,
        slug,
        tweetIds: extractTweetIds(content),
        content,
        searchText: buildPortfolioSearchText(metadata, content),
      };
    })
  );

  // Sort posts by date once, not on every request
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
};

function parseFrontmatter(fileContent: string) {
  const { data, content } = matter(fileContent);

  if (!Object.keys(data).length) {
    throw new Error("Invalid frontmatter");
  }

  return {
    metadata: normalizePortfolioMetadata(data),
    content: content.trim(),
  };
}

function normalizePortfolioMetadata(
  metadata: RawPortfolioMetadata
): PortfolioMetadata {
  return {
    title: normalizeString(metadata.title) ?? "Untitled portfolio project",
    publishedAt: normalizeString(metadata.publishedAt) ?? "",
    summary: normalizeString(metadata.summary) ?? "",
    category: normalizeString(metadata.category),
    banner: normalizeString(metadata.banner) ?? "",
    alt: normalizeString(metadata.alt),
    image: normalizeString(metadata.image),
    startDate: normalizeString(metadata.startDate),
    endDate: normalizeString(metadata.endDate),
    tags: normalizeTags(metadata.tags),
    status: normalizeStatus(metadata.status),
    repoUrl: normalizeString(metadata.repoUrl),
    liveUrl: normalizeString(metadata.liveUrl),
  };
}

function normalizeString(value: unknown) {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }

  const stringValue = String(value).trim();
  return stringValue || undefined;
}

function normalizeTags(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((tag) => normalizeString(tag))
      .filter((tag): tag is string => Boolean(tag));
  }

  const tag = normalizeString(value);

  if (!tag) {
    return [];
  }

  return tag
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeStatus(value: unknown) {
  const status = normalizeString(value);

  if (!status) {
    return undefined;
  }

  return PORTFOLIO_STATUSES.includes(status as PortfolioStatus)
    ? (status as PortfolioStatus)
    : undefined;
}

function buildPortfolioSearchText(
  metadata: PortfolioMetadata,
  content: string
) {
  return normalizeSearchText(
    [
      metadata.title,
      metadata.summary,
      metadata.category,
      ...metadata.tags,
      metadata.status,
      stripMdxToSearchableText(content),
    ]
      .filter(Boolean)
      .join(" ")
  );
}

function extractTweetIds(content: string) {
  const tweetRegex = /<StaticTweet\sid="(\d+)"\s*\/>/g;
  const tweetIds: string[] = [];
  let match;

  while ((match = tweetRegex.exec(content)) !== null) {
    tweetIds.push(match[1]);
  }

  return tweetIds;
}
