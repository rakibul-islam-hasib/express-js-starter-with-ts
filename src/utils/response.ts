import { Response } from 'express';

/**
 * Standard API Response Format
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
        message: string;
        statusCode: number;
        stack?: string;
    };
    pagination?: PaginationMeta;
    timestamp: string;
    requestId?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

/**
 * Pagination options
 */
export interface PaginationOptions {
    page: number;
    limit: number;
    total: number;
}

/**
 * Send success response
 */
export const sendSuccess = <T>(
    res: Response,
    data: T,
    message?: string,
    statusCode = 200
): Response => {
    return res.status(statusCode).json({
        success: true,
        data,
        message,
        timestamp: new Date().toISOString(),
    } as ApiResponse<T>);
};

/**
 * Send created response (201)
 */
export const sendCreated = <T>(
    res: Response,
    data: T,
    message = 'Resource created successfully'
): Response => {
    return sendSuccess(res, data, message, 201);
};

/**
 * Send no content response (204)
 */
export const sendNoContent = (res: Response): Response => {
    return res.status(204).send();
};

/**
 * Send paginated response
 */
export const sendPaginated = <T>(
    res: Response,
    data: T[],
    options: PaginationOptions,
    message?: string
): Response => {
    const { page, limit, total } = options;
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
        success: true,
        data,
        message,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
        timestamp: new Date().toISOString(),
    } as ApiResponse<T[]>);
};

/**
 * Calculate pagination skip value
 */
export const getPaginationSkip = (page: number, limit: number): number => {
    return (page - 1) * limit;
};
