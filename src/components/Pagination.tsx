import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  category?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  category,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    }

    params.set("page", String(page));

    return `/products?${params.toString()}`;
  };

  return (
    <nav className="pagination" aria-label="Product pagination">
      {currentPage > 1 ? (
        <Link href={getPageUrl(currentPage - 1)} className="pagination-button">
          Previous
        </Link>
      ) : (
        <span className="pagination-button disabled">Previous</span>
      )}

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;

        return (
          <Link
            key={pageNumber}
            href={getPageUrl(pageNumber)}
            className={`pagination-number ${
              currentPage === pageNumber ? "active" : ""
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link href={getPageUrl(currentPage + 1)} className="pagination-button">
          Next
        </Link>
      ) : (
        <span className="pagination-button disabled">Next</span>
      )}
    </nav>
  );
}