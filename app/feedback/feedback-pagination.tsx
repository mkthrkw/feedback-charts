import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function FeedbackPagination({
  currentPage,
  totalPages,
  pageSize,
}: {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const baseUrl = "/feedback";
  const previousPageUrl = isFirstPage ? baseUrl : `${baseUrl}?pageSize=${pageSize}&page=${currentPage - 1}`;
  const nextPageUrl = isLastPage ? baseUrl : `${baseUrl}?pageSize=${pageSize}&page=${currentPage + 1}`;
  const getDisplayPages = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={previousPageUrl} disabled={isFirstPage} />
        </PaginationItem>
        {getDisplayPages(currentPage, totalPages).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`${baseUrl}?pageSize=${pageSize}&page=${page}`}
              isActive={page === currentPage}
            >{page}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={nextPageUrl} disabled={isLastPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}