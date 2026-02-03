import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Environment variables schema with validation
 */
const envSchema = z.object({
    // Server Configuration
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    PORT: z.coerce.number().default(3000),
    API_PREFIX: z.string().default('/api'),

    // Database Configuration
    MONGO_URI: z.string().min(1, 'MONGO_URI is required'),

    // Security Configuration
    CORS_ORIGIN: z
        .string()
        .default('*')
        .transform(val => (val === '*' ? '*' : val.split(',').map(s => s.trim()))),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().default(15 * 60 * 1000), // 15 minutes
    RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),

    // Logging Configuration
    LOG_LEVEL: z
        .enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'])
        .default('info'),

    // Cloudinary Configuration (optional)
    CLOUDINARY_CLOUD_NAME: z.string().optional(),
    CLOUDINARY_API_KEY: z.string().optional(),
    CLOUDINARY_API_SECRET: z.string().optional(),

    // SMTP Configuration (optional)
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.coerce.number().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    SMTP_FROM: z.string().optional(),
});

/**
 * Parse and validate environment variables
 */
const parseEnv = () => {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
        console.error('❌ Invalid environment variables:');
        console.error(result.error.format());
        process.exit(1);
    }

    return result.data;
};

/**
 * Validated environment configuration
 */
export const env = parseEnv();

/**
 * Environment helper functions
 */
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

/**
 * Structured configuration object
 */
export const config = {
    server: {
        port: env.PORT,
        env: env.NODE_ENV,
        apiPrefix: env.API_PREFIX,
    },
    database: {
        uri: env.MONGO_URI,
    },
    security: {
        corsOrigin: env.CORS_ORIGIN,
        rateLimit: {
            windowMs: env.RATE_LIMIT_WINDOW_MS,
            max: env.RATE_LIMIT_MAX_REQUESTS,
        },
    },
    logging: {
        level: env.LOG_LEVEL,
    },
    cloudinary: {
        cloudName: env.CLOUDINARY_CLOUD_NAME,
        apiKey: env.CLOUDINARY_API_KEY,
        apiSecret: env.CLOUDINARY_API_SECRET,
    },
    smtp: {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
        from: env.SMTP_FROM,
    },
} as const;

export type EnvConfig = typeof env;
export type AppConfig = typeof config;
