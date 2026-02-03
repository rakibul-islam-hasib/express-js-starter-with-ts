import { Request, Response, NextFunction } from 'express';
import { isDevelopment } from '@/config';
import logger from '@/utils/logger';

/**
 * Custom API Error class
 */
export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(
        statusCode: number,
        message: string,
        isOperational = true,
        stack = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    static badRequest(message = 'Bad Request') {
        return new ApiError(400, message);
    }

    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, message);
    }

    static forbidden(message = 'Forbidden') {
        return new ApiError(403, message);
    }

    static notFound(message = 'Not Found') {
        return new ApiError(404, message);
    }

    static conflict(message = 'Conflict') {
        return new ApiError(409, message);
    }

    static unprocessable(message = 'Unprocessable Entity') {
        return new ApiError(422, message);
    }

    static tooManyRequests(message = 'Too Many Requests') {
        return new ApiError(429, message);
    }

    static internal(message = 'Internal Server Error') {
        return new ApiError(500, message, false);
    }
}

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

/**
 * Global error handler middleware
 */
export const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    // Default error values
    let statusCode = 500;
    let message = 'Internal Server Error';
    let stack: string | undefined;

    // Handle ApiError instances
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof Error) {
        message = err.message;
    }

    // Include stack trace in development
    if (isDevelopment) {
        stack = err.stack;
    }

    // Log error
    logger.error(`[${(req as any).id || 'no-id'}] ${statusCode} - ${message}`, {
        method: req.method,
        url: req.originalUrl,
        stack: err.stack,
    });

    // Send error response
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            statusCode,
            ...(stack && { stack }),
        },
        timestamp: new Date().toISOString(),
        requestId: (req as any).id,
    });
};
