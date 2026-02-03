import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Async handler wrapper to catch errors in async route handlers
 * Eliminates the need for try-catch blocks in every route
 * 
 * @example
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 */
export const asyncHandler = <T>(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default asyncHandler;
