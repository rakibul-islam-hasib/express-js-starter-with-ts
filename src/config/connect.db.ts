import logger from '@/utils/logger';
import mongoose, { ConnectOptions } from 'mongoose';
const connectDB = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URI;
        if (!MONGO_URL) {
            throw new Error('MONGO_URI is not defined');
        }
        await mongoose.connect(MONGO_URL, {
          
        } as ConnectOptions);
        console.log('MongoDB connected - mongoose');
    } catch (error) {
        console.error('MongoDB connection error:(mongoose)', error);
        logger.error('MongoDB connection error:(mongoose)', error);
        process.exit(1);
    }
};

export default connectDB;