/*
 * Build-time RSS feed generator.
 * Run with: node scripts/generate-rss.mjs
 * Reads markdown posts and portfolios, writes public/rss.xml inside apps/web.
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = path.resolve(__dirname, "../apps/web");
const PACKAGE_JSON_PATH = path.join(WEB_ROOT, "package.json");
const AUTHOR = "Hoà T. (Thomas) Nguyen";
const TITLE = "Hoà T. (Thomas) Nguyen - hoatepdev | Full-stack Developer";
const DESCRIPTION =
  "I'm Hoà T. (Thomas) Nguyen, a graduate with a Bachelor's degree from Post and Telecommunication Institute of Technology (PTIT), driven by a sincere passion for Software Engineering.";

function normalizeSiteUrl(url) {
  return String(url).replace(/\/+$/, "");
}

async function getSiteUrl() {
  const packageJson = JSON.parse(await fs.readFile(PACKAGE_JSON_PATH, "utf-8"));

  return normalizeSiteUrl(
    process.env.SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      packageJson.homepage ||
      "https://www.hoatepdev.com"
  );
}

function parseFrontmatter(content) {
  const match = /^---\s*([\s\S]*?)\s*---/.exec(content);
  if (!match) return null;
  const meta = {};
  const kvRegex = /^(\w+):\s*(?:"([^"]*)"|'([^']*)'|(.*))$/;
  match[1]
    .trim()
    .split("\n")
    .forEach((line) => {
      const m = kvRegex.exec(line.trim());
      if (m) meta[m[1]] = m[2] || m[3] || m[4];
    });
  return meta;
}

function isHidden(meta) {
  return String(meta.hidden ?? "").trim().toLowerCase() === "true";
}

async function readPosts(dir) {
  const postsDir = path.join(WEB_ROOT, "src/contents", dir);
  try {
    const files = await fs.readdir(postsDir);
    const mdFiles = files.filter(
      (file) => file.endsWith(".md") || file.endsWith(".mdx")
    );
    const posts = [];
    for (const file of mdFiles) {
      const content = await fs.readFile(path.join(postsDir, file), "utf-8");
      const meta = parseFrontmatter(content);
      if (meta && !isHidden(meta)) {
        posts.push({
          slug: path.basename(file, path.extname(file)),
          ...meta,
        });
      }
    }
    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch {
    return [];
  }
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getLatestPubDate(items) {
  const latestTimestamp = items.reduce((latest, item) => {
    const timestamp = new Date(item.date).getTime();

    return Number.isFinite(timestamp) && timestamp > latest ? timestamp : latest;
  }, 0);

  return new Date(latestTimestamp).toUTCString();
}

async function main() {
  const siteUrl = await getSiteUrl();
  const blogPosts = await readPosts("posts");
  const portfolioPosts = await readPosts("portfolios");

  const items = [
    ...blogPosts.map((post) => ({
      title: post.title,
      url: `${siteUrl}/post/${post.slug}/`,
      date: post.publishedAt,
      summary: post.summary,
    })),
    ...portfolioPosts.map((post) => ({
      title: post.title,
      url: `${siteUrl}/portfolio/${post.slug}/`,
      date: post.publishedAt,
      summary: post.summary,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>en-US</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${getLatestPubDate(items)}</lastBuildDate>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title || "")}</title>
      <link>${item.url}</link>
      <guid>${item.url}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.summary || "")}</description>
      <author>${escapeXml(AUTHOR)}</author>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  const outPath = path.join(WEB_ROOT, "public/rss.xml");
  await fs.writeFile(outPath, rss, "utf-8");
  console.log(`✅ RSS feed generated: ${outPath} (${items.length} items)`);
}

main().catch((err) => {
  console.error("❌ Failed to generate RSS:", err);
  process.exit(1);
});
