import moment from "moment";

import type { Breakpoint } from "@/hooks/use-responsive-image-size";

export const GITHUB_USERNAME = "hoatepdev";
export const MEDIUM_USERNAME = "hoatepdev";
export const TWITTER_USERNAME = "hoatepdev";
export const LINKEDIN_USERNAME = "hoatepdev";
export const EMAIL = "hoanguyentrandev@gmail.com";

export const POSTS_PER_PAGE = 8;
export const BUILD_TIME = moment().format("MMMM Do YYYY");

export const DEVOPS = {
  linux: "linux",
  aws: "aws",
  azure: "azure",
  githubactions: "githubactions",
  docker: "docker",
  fastapi: "fastapi",
  kubernetes: "kubernetes",
  flask: "flask",
  gitlab: "gitlab",
  redis: "redis",
};

export const PROGLANG = {
  python: "py",
  go: "go",
  java: "java",
  cpp: "cpp",
  c: "c",
  react: "react",
  typescript: "typescript",
  javascript: "javascript",
  flutter: "flutter",
  bash: "bash",
};

export const breakpoints: Breakpoint[] = [
  { maxWidth: 250, size: { width: 90, height: 90 } },
  { maxWidth: 375, size: { width: 90, height: 90 } },
  { maxWidth: 580, size: { width: 90, height: 90 } },
  { maxWidth: 1250, size: { width: 120, height: 120 } },
  { maxWidth: Infinity, size: { width: 150, height: 150 } },
];

export const EXAMPLE_PATH = "blog-starter";
export const CMS_NAME = "Markdown";
export const HOME_OG_IMAGE_URL =
  "https://docs.1chooo.com/images/cover-with-1chooo-com.png";
