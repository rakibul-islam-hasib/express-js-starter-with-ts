import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { config, isDevelopment } from '@/config';
import { errorHandler, notFoundHandler } from '@/middleware';
import routes from '@/routes';
import logger from '@/utils/logger';

/**
 * Create and configure Express application
 */
export const createApp = (): Express => {
    const app = express();

    // ===================
    // Security Middleware
    // ===================
    app.use(helmet());

    // CORS configuration
    app.use(
        cors({
            origin: config.security.corsOrigin,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
        })
    );

    // ===================
    // Body Parsing
    // ===================
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // ===================
    // Request Logging
    // ===================
    if (isDevelopment) {
        app.use(morgan('dev'));
    } else {
        app.use(
            morgan(':method :url :status :response-time ms - :res[content-length]', {
                stream: {
                    write: (message: string) => logger.http(message.trim()),
                },
            })
        );
    }

    // ===================
    // Request ID Tracking
    // ===================
    app.use((req, _res, next) => {
        (req as any).id = req.headers['x-request-id'] as string || crypto.randomUUID();
        next();
    });

    // ===================
    // API Routes
    // ===================
    app.use(config.server.apiPrefix, routes);

    // ===================
    // Error Handling
    // ===================
    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
};

export default createApp;
