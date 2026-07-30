import React from "react";

import { ProgressBarLink } from "@/components/progress-bar";

interface FilterListProps {
  path: string;
  selectedTag: string;
  blogTags: string[];
  query?: Record<string, string | undefined>;
}

const ALL_TAG = "All";

function getFilterHref(
  path: string,
  tag: string,
  query: FilterListProps["query"]
) {
  const params: Record<string, string> = {};

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value) {
      params[key] = value;
    }
  });

  if (tag !== ALL_TAG) {
    params.tag = tag;
  }

  return {
    pathname: `/${path}`,
    query: params,
  };
}

function FilterList({ path, selectedTag, blogTags, query }: FilterListProps) {
  return (
    <ul className="filter-list">
      {blogTags.map((tag, index) => (
        <li className="filter-item" key={index}>
          <ProgressBarLink
            href={getFilterHref(path, tag, query)}
            className={`filter-btn ${selectedTag === tag ? "active" : ""}`}
          >
            {tag}
          </ProgressBarLink>
        </li>
      ))}
    </ul>
  );
}

export default FilterList;
