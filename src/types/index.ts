/**
 * Common type definitions
 */

/**
 * Generic ID type (MongoDB ObjectId as string)
 */
export type ID = string;

/**
 * Timestamps interface for MongoDB documents
 */
export interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Base document interface
 */
export interface BaseDocument extends Timestamps {
    _id: ID;
}

/**
 * Pagination query parameters
 */
export interface PaginationQuery {
    page?: string;
    limit?: string;
    sort?: string;
    order?: 'asc' | 'desc';
}

/**
 * Sort options for database queries
 */
export interface SortOptions {
    [key: string]: 1 | -1;
}

/**
 * Parse pagination query parameters
 */
export const parsePaginationQuery = (query: PaginationQuery) => {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10', 10)));
    const skip = (page - 1) * limit;

    const sortField = query.sort || 'createdAt';
    const sortOrder = query.order === 'asc' ? 1 : -1;
    const sort: SortOptions = { [sortField]: sortOrder };

    return { page, limit, skip, sort };
};
