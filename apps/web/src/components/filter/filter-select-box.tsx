"use client";

import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";

import { ProgressBarLink } from "@/components/progress-bar";

interface FilterSelectBoxProps {
  path: string;
  selectedTag: string;
  blogTags: string[];
  query?: Record<string, string | undefined>;
}

const ALL_TAG = "All";

function getFilterHref(
  path: string,
  tag: string,
  query: FilterSelectBoxProps["query"]
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

function FilterSelectBox({
  path,
  selectedTag,
  blogTags,
  query,
}: FilterSelectBoxProps) {
  const [isSelectActive, setIsSelectActive] = useState(false);

  return (
    <div className="filter-select-box">
      <button
        className={`filter-select ${isSelectActive ? "active" : ""}`}
        onClick={() => setIsSelectActive(!isSelectActive)}
      >
        <div className="select-value">{selectedTag || "Select category"}</div>
        <div className="select-icon">
          <MdExpandMore />
        </div>
      </button>
      {isSelectActive && (
        <ul className="select-list">
          {blogTags.map((tag: string) => (
            <li className="select-item" key={tag}>
              <button
                onClick={() => {
                  setIsSelectActive(false);
                }}
              >
                <ProgressBarLink href={getFilterHref(path, tag, query)}>
                  {tag}
                </ProgressBarLink>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterSelectBox;
