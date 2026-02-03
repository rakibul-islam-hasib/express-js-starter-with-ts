import { Request } from 'express';

/**
 * Extended Express Request with additional properties
 */
declare global {
    namespace Express {
        interface Request {
            /**
             * Unique request identifier for tracking
             */
            id?: string;

            /**
             * Authenticated user (populated by auth middleware)
             */
            user?: {
                id: string;
                email: string;
                role: string;
            };
        }
    }
}

export { };
