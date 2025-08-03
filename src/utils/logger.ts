import path from 'path';

import { createLogger, transports, format } from 'winston';

const logDir = path.join(__dirname, '../../logs');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }), // captures stack trace
        format.printf(
            info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`
        )
    ),
    transports: [
        new transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
        }),
        new transports.File({
            filename: path.join(logDir, 'server.log'),
            level: 'info',
        }),
        new transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
        }),
    ],
    exceptionHandlers: [
        new transports.File({ filename: path.join(logDir, 'exceptions.log') }),
    ],
    rejectionHandlers: [
        new transports.File({ filename: path.join(logDir, 'rejections.log') }),
    ],
    exitOnError: false, // keeps the app running after handling exceptions
});

export default logger;
