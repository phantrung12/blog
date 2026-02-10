export declare enum PageStatus {
    DRAFT = "draft",
    PUBLISHED = "published"
}
export declare class Page {
    id: string;
    title: string;
    slug: string;
    content: string;
    status: PageStatus;
    metaTitle: string | null;
    metaDescription: string | null;
    searchVector: string;
    createdAt: Date;
    updatedAt: Date;
}
