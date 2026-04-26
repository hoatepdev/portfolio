import { Suspense } from "react";

import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import config from "@/config";
import { getBlogPosts } from "@/lib/db/v1/post";

import PostListClient from "./post-list-client";

const { title, about } = config;

export const metadata = {
  title: `Post | ${title}`,
  description: "Read my thoughts on software development, design, and more.",
};

export default async function Post() {
  const allBlogs = await getBlogPosts();
  const posts = allBlogs.map(({ slug, metadata }) => ({ slug, metadata }));

  return (
    <article>
      <PageHeader header={`${about.preferredName}'s Blog`} />

      <Suspense fallback={<Loading />}>
        <PostListClient posts={posts} />
      </Suspense>
    </article>
  );
}
