export declare class PaginationDto {
    page?: number;
    limit?: number;
}
export interface PaginatedResult<T> {
    items: T[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}
