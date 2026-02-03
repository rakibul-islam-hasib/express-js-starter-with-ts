import http from 'http';

import { createApp } from '@/app';
import { config, connectDB } from '@/config';
import logger from '@/utils/logger';

/**
 * Server instance
 */
let server: http.Server;

/**
 * Graceful shutdown handler
 */
const gracefulShutdown = (signal: string) => {
    logger.info(`${signal} received. Starting graceful shutdown...`);

    server.close((err) => {
        if (err) {
            logger.error('Error during server close:', err);
            process.exit(1);
        }

        logger.info('HTTP server closed.');

        // Close database connection
        import('mongoose').then((mongoose) => {
            mongoose.connection.close(false).then(() => {
                logger.info('MongoDB connection closed.');
                process.exit(0);
            });
        });
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
        logger.error('Forced shutdown due to timeout');
        process.exit(1);
    }, 30000);
};

/**
 * Start the server
 */
const startServer = async (): Promise<void> => {
    try {
        // Connect to database
        await connectDB();

        // Create Express app
        const app = createApp();

        // Create HTTP server
        server = http.createServer(app);

        // Start listening
        server.listen(config.server.port, () => {
            logger.info('='.repeat(50));
            logger.info(`🚀 Server started successfully`);
            logger.info(`   Environment: ${config.server.env}`);
            logger.info(`   Port: ${config.server.port}`);
            logger.info(`   API Prefix: ${config.server.apiPrefix}`);
            logger.info(`   URL: http://localhost:${config.server.port}${config.server.apiPrefix}`);
            logger.info('='.repeat(50));
        });

        // Handle server errors
        server.on('error', (error: NodeJS.ErrnoException) => {
            if (error.syscall !== 'listen') {
                throw error;
            }

            switch (error.code) {
                case 'EACCES':
                    logger.error(`Port ${config.server.port} requires elevated privileges`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    logger.error(`Port ${config.server.port} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });

        // Graceful shutdown handlers
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

/**
 * Handle unhandled rejections and exceptions
 */
process.on('unhandledRejection', (reason: Error) => {
    logger.error('Unhandled Rejection:', reason);
    throw reason;
});

process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

// Start the server
startServer();
