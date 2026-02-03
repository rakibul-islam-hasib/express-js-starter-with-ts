import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError, ZodIssue } from 'zod';
import { ApiError } from './errorHandler';

/**
 * Request validation middleware using Zod schemas
 * 
 * @example
 * const userSchema = z.object({
 *   body: z.object({
 *     name: z.string().min(1),
 *     email: z.string().email(),
 *   }),
 * });
 * 
 * router.post('/users', validate(userSchema), userController.create);
 */
export const validate = (schema: ZodSchema) => {
    return async (
        req: Request,
        _res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((issue: ZodIssue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                }));

                next(
                    new ApiError(
                        400,
                        `Validation failed: ${errorMessages.map((e) => e.message).join(', ')}`
                    )
                );
            } else {
                next(error);
            }
        }
    };
};

export default validate;
