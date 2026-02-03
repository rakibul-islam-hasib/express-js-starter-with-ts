import mongoose, { ConnectOptions } from 'mongoose';
import logger from '@/utils/logger';

/**
 * Connect to MongoDB database
 * In development mode, connection failure won't crash the server
 */
const connectDB = async (): Promise<void> => {
    try {
        const MONGO_URI = process.env.MONGO_URI;

        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        } as ConnectOptions);

        logger.info('✅ MongoDB connected successfully');

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            logger.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            logger.warn('MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            logger.info('MongoDB reconnected');
        });
    } catch (error) {
        logger.error('❌ MongoDB connection failed:', error);

        // In development, don't exit - allow server to run without DB
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        } else {
            logger.warn('⚠️ Server running without database connection (development mode)');
        }
    }
};

export default connectDB;