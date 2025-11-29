import {
    Pagination as PaginationComponent,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
    page: number;
}

export const Pagination = ({ page }: Props) => {
    return (
        <PaginationComponent>
            <PaginationContent>
                {page > 1 && <PaginationItem>
                    <PaginationPrevious href={`/${page - 1}`} />
                </PaginationItem>}
                <PaginationItem>
                    <PaginationNext href={`/${page + 1}`} />
                </PaginationItem>
            </PaginationContent>
        </PaginationComponent>
    )
}