import { ProgressBarLink } from "@/components/progress-bar";
import { ALL_LISTING_TAG, getPaginationHref } from "@/lib/listing-query";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  selectedTag?: string;
  query?: Record<string, string | undefined>;
}

type PaginationItem = number | "start-ellipsis" | "end-ellipsis";

const pageLinkClasses =
  "border-jet bg-border-gradient-onyx text-light-gray hover:border-light-gray-70 hover:text-white-2 inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium shadow-lg transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-yellow-crayola/70 focus-visible:ring-offset-2 focus-visible:ring-offset-eerie-black-1 active:scale-95";

const disabledClasses =
  "border-jet text-light-gray-70 inline-flex h-10 min-w-10 cursor-not-allowed items-center justify-center rounded-xl border px-3 text-sm font-medium opacity-60";

function getVisiblePageItems(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "end-ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "start-ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "start-ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "end-ellipsis",
    totalPages,
  ];
}

function Pagination({
  currentPage,
  totalPages,
  selectedTag,
  basePath,
  query,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePageItems = getVisiblePageItems(currentPage, totalPages);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav aria-label="Pagination" className="mt-8 flex justify-center">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {currentPage > 1 ? (
            <ProgressBarLink
              href={getPaginationHref({
                basePath,
                pageNum: previousPage,
                query,
                selectedTag,
                allTag: ALL_LISTING_TAG,
              })}
              className={pageLinkClasses}
            >
              Prev
            </ProgressBarLink>
          ) : (
            <span aria-disabled="true" className={disabledClasses}>
              Prev
            </span>
          )}
        </li>

        {visiblePageItems.map((pageItem) => {
          if (typeof pageItem !== "number") {
            return (
              <li key={pageItem} aria-hidden="true">
                <span className="text-light-gray-70 flex h-10 min-w-10 items-center justify-center px-1">
                  …
                </span>
              </li>
            );
          }

          const isActive = pageItem === currentPage;

          return (
            <li key={pageItem}>
              <ProgressBarLink
                href={getPaginationHref({
                  basePath,
                  pageNum: pageItem,
                  query,
                  selectedTag,
                  allTag: ALL_LISTING_TAG,
                })}
                aria-label={
                  isActive ? `Page ${pageItem}` : `Go to page ${pageItem}`
                }
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  pageLinkClasses,
                  isActive &&
                    "border-orange-yellow-crayola bg-orange-yellow-crayola-dark text-orange-yellow-crayola font-semibold"
                )}
              >
                {pageItem}
              </ProgressBarLink>
            </li>
          );
        })}

        <li>
          {currentPage < totalPages ? (
            <ProgressBarLink
              href={getPaginationHref({
                basePath,
                pageNum: nextPage,
                query,
                selectedTag,
                allTag: ALL_LISTING_TAG,
              })}
              className={pageLinkClasses}
            >
              Next
            </ProgressBarLink>
          ) : (
            <span aria-disabled="true" className={disabledClasses}>
              Next
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
