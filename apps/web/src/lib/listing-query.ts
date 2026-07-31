export type ListingQuery = Record<string, string | undefined>;

export const ALL_LISTING_TAG = "All";

export function getCleanListingQuery(
  query: ListingQuery | undefined,
  omitKeys: string[] = []
) {
  const omittedKeys = new Set(omitKeys);
  const params: Record<string, string> = {};

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value && !omittedKeys.has(key)) {
      params[key] = value;
    }
  });

  return params;
}

export function getSelectedListingTag(
  tag: string | null,
  tags: string[],
  allTag = ALL_LISTING_TAG
) {
  return tag && tags.includes(tag) ? tag : allTag;
}

export function getCurrentListingPage(page: string | null, totalPages: number) {
  const parsedPage = Number.parseInt(page ?? "1", 10);

  if (!Number.isFinite(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return Math.min(parsedPage, Math.max(totalPages, 1));
}

export function getListingHref({
  basePath,
  query,
}: {
  basePath: string;
  query?: ListingQuery;
}) {
  const params = new URLSearchParams(getCleanListingQuery(query));
  const search = params.toString();

  return `${basePath}${search ? `?${search}` : ""}`;
}

export function getFilterHref({
  path,
  tag,
  query,
  paramKey = "tag",
  allTag = ALL_LISTING_TAG,
}: {
  path: string;
  tag: string;
  query?: ListingQuery;
  paramKey?: string;
  allTag?: string;
}) {
  const params = getCleanListingQuery(query, ["page", paramKey]);

  if (tag !== allTag) {
    params[paramKey] = tag;
  }

  return {
    pathname: `/${path}`,
    query: params,
  };
}

export function getPaginationHref({
  basePath,
  pageNum,
  query,
  selectedTag,
  allTag = ALL_LISTING_TAG,
}: {
  basePath: string;
  pageNum: number;
  query?: ListingQuery;
  selectedTag?: string;
  allTag?: string;
}) {
  const params = getCleanListingQuery(query, ["page"]);

  if (selectedTag && selectedTag !== allTag && !params.tag) {
    params.tag = selectedTag;
  }

  if (pageNum > 1) {
    params.page = pageNum.toString();
  }

  return {
    pathname: basePath,
    query: params,
  };
}
