import { ProgressBarLink } from "@/components/progress-bar";
import { ALL_LISTING_TAG, getFilterHref } from "@/lib/listing-query";
import { cn } from "@/lib/utils";

interface FilterListProps {
  path: string;
  selectedTag: string;
  blogTags: string[];
  query?: Record<string, string | undefined>;
  paramKey?: string;
  allTag?: string;
  ariaLabel?: string;
}

function FilterList({
  path,
  selectedTag,
  blogTags,
  query,
  paramKey = "tag",
  allTag = ALL_LISTING_TAG,
  ariaLabel = "Filter content by category",
}: FilterListProps) {
  return (
    <nav aria-label={ariaLabel} className="custom-md:block mb-5 hidden">
      <ul className="flex flex-wrap items-center gap-3 pl-1">
        {blogTags.map((tag) => {
          const isActive = selectedTag === tag;

          return (
            <li key={tag}>
              <ProgressBarLink
                href={getFilterHref({ path, tag, query, paramKey, allTag })}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "border-jet text-light-gray hover:border-light-gray-70 hover:text-white-2 focus-visible:ring-orange-yellow-crayola/70 focus-visible:ring-offset-eerie-black-1 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  isActive &&
                    "border-orange-yellow-crayola bg-orange-yellow-crayola-dark text-orange-yellow-crayola shadow-lg"
                )}
              >
                {tag}
              </ProgressBarLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default FilterList;
