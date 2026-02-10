import { PageStatus } from '../entities/page.entity';
export declare class CreatePageDto {
    title: string;
    slug?: string;
    content: string;
    status?: PageStatus;
    metaTitle?: string;
    metaDescription?: string;
}
