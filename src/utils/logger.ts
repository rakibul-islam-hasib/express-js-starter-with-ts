import path from 'path';
import { createLogger, transports, format } from 'winston';

// Import config directly to avoid circular dependency
const logLevel = process.env.LOG_LEVEL || 'info';
const nodeEnv = process.env.NODE_ENV || 'development';
const logDir = path.join(process.cwd(), 'logs');

/**
 * Custom log format for console (colorized in development)
 */
const consoleFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    nodeEnv === 'development'
        ? format.combine(
            format.colorize({ all: true }),
            format.printf(
                ({ timestamp, level, message, stack }) =>
                    `[${timestamp}] ${level}: ${message}${stack ? `\n${stack}` : ''}`
            )
        )
        : format.printf(
            ({ timestamp, level, message }) =>
                `[${timestamp}] ${level.toUpperCase()}: ${message}`
        )
);

/**
 * JSON format for file logging (better for log aggregation)
 */
const fileFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
);

/**
 * Winston logger instance
 */
const logger = createLogger({
    level: logLevel,
    transports: [
        // Console transport
        new transports.Console({
            format: consoleFormat,
            level: nodeEnv === 'production' ? 'warn' : logLevel,
        }),
        // Combined log file
        new transports.File({
            filename: path.join(logDir, 'combined.log'),
            format: fileFormat,
            level: 'info',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        // Error log file
        new transports.File({
            filename: path.join(logDir, 'error.log'),
            format: fileFormat,
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
    ],
    // Handle uncaught exceptions
    exceptionHandlers: [
        new transports.File({
            filename: path.join(logDir, 'exceptions.log'),
            format: fileFormat,
        }),
    ],
    // Handle unhandled promise rejections
    rejectionHandlers: [
        new transports.File({
            filename: path.join(logDir, 'rejections.log'),
            format: fileFormat,
        }),
    ],
    exitOnError: false,
});

/**
 * Stream for Morgan HTTP logging
 */
export const morganStream = {
    write: (message: string) => {
        logger.http(message.trim());
    },
};

export default logger;
