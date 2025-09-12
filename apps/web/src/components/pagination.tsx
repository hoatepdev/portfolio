import { ProgressBarLink } from "@/components/progress-bar";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  selectedTag: string;
  basePath: string;
}

function Pagination({
  currentPage,
  totalPages,
  selectedTag,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-5 flex justify-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <ProgressBarLink
          key={pageNum}
          href={{
            pathname: basePath,
            query: { tag: selectedTag, page: pageNum.toString() },
          }}
          className={`bg-border-gradient-onyx hover:bg-orange-yellow-crayola-dark mx-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-none px-4 py-2 text-base shadow-lg hover:scale-105 active:scale-95 ${
            pageNum === currentPage
              ? "text-orange-yellow-crayola"
              : "text-white-2"
          }`}
          style={{
            transition: "background-color 0.3s ease",
          }}
        >
          {pageNum}
        </ProgressBarLink>
      ))}
    </div>
  );
}

export default Pagination;
