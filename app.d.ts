declare namespace NodeJS {
    interface ProcessEnv {
        // Server Configuration
        NODE_ENV: 'development' | 'production' | 'test';
        PORT: string;
        API_PREFIX: string;

        // Database Configuration
        MONGO_URI: string;

        // Security Configuration
        CORS_ORIGIN: string;
        RATE_LIMIT_WINDOW_MS: string;
        RATE_LIMIT_MAX_REQUESTS: string;

        // Logging Configuration
        LOG_LEVEL: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

        // Cloudinary Configuration
        CLOUDINARY_CLOUD_NAME?: string;
        CLOUDINARY_API_KEY?: string;
        CLOUDINARY_API_SECRET?: string;

        // SMTP Configuration
        SMTP_HOST?: string;
        SMTP_PORT?: string;
        SMTP_USER?: string;
        SMTP_PASS?: string;
        SMTP_FROM?: string;
    }
}