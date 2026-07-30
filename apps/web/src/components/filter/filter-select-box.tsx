"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MdCheck, MdExpandMore } from "react-icons/md";

import { ProgressBarLink } from "@/components/progress-bar";
import { ALL_LISTING_TAG, getFilterHref } from "@/lib/listing-query";
import { cn } from "@/lib/utils";

interface FilterSelectBoxProps {
  path: string;
  selectedTag: string;
  blogTags: string[];
  query?: Record<string, string | undefined>;
  paramKey?: string;
  allTag?: string;
  ariaLabel?: string;
}

function FilterSelectBox({
  path,
  selectedTag,
  blogTags,
  query,
  paramKey = "tag",
  allTag = ALL_LISTING_TAG,
  ariaLabel = "Filter content by category",
}: FilterSelectBoxProps) {
  const [isSelectActive, setIsSelectActive] = useState(false);
  const controlId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isSelectActive) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsSelectActive(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSelectActive(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSelectActive]);

  return (
    <div ref={containerRef} className="custom-md:hidden relative mb-6">
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isSelectActive}
        aria-controls={controlId}
        className={cn(
          "border-jet bg-eerie-black-2 text-light-gray focus-visible:ring-orange-yellow-crayola/70 focus-visible:ring-offset-eerie-black-1 flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          isSelectActive && "border-orange-yellow-crayola text-white-2"
        )}
        onClick={() => setIsSelectActive((current) => !current)}
      >
        <span>
          <span className="text-light-gray-70 mr-2 text-xs uppercase tracking-wider">
            Category
          </span>
          {selectedTag || "Select category"}
        </span>
        <MdExpandMore
          aria-hidden="true"
          className={cn(
            "text-orange-yellow-crayola text-xl transition-transform",
            isSelectActive && "rotate-180"
          )}
        />
      </button>

      {isSelectActive && (
        <ul
          id={controlId}
          aria-label={ariaLabel}
          className="border-jet bg-eerie-black-2 absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 rounded-2xl border p-2 shadow-2xl"
        >
          {blogTags.map((tag) => {
            const isActive = selectedTag === tag;

            return (
              <li key={tag}>
                <ProgressBarLink
                  href={getFilterHref({ path, tag, query, paramKey, allTag })}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsSelectActive(false)}
                  className={cn(
                    "text-light-gray hover:bg-onyx hover:text-white-2 focus-visible:ring-orange-yellow-crayola/70 focus-visible:ring-offset-eerie-black-2 flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    isActive &&
                      "bg-orange-yellow-crayola-dark text-orange-yellow-crayola"
                  )}
                >
                  <span>{tag}</span>
                  {isActive && <MdCheck aria-hidden="true" />}
                </ProgressBarLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default FilterSelectBox;
