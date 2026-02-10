export declare enum SearchType {
    ALL = "all",
    POSTS = "posts",
    PAGES = "pages"
}
export declare class SearchQueryDto {
    q: string;
    type?: SearchType;
    limit?: number;
}
