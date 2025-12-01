import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  basePath?: string;
  totalPages?: number;
};

export const Pagination = ({ page, basePath = "", totalPages }: Props) => {
  const showNext = totalPages ? page < totalPages : true;

  if (totalPages && totalPages <= 1) {
    return null;
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${basePath}/${page - 1}`} />
          </PaginationItem>
        )}
        {showNext && (
          <PaginationItem>
            <PaginationNext href={`${basePath}/${page + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationComponent>
  );
};
