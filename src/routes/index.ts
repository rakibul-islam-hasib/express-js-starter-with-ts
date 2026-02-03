import { Router } from 'express';
import healthRoutes from './health.routes';

const router = Router();

/**
 * API Routes
 * 
 * All routes are prefixed with the API_PREFIX from environment
 * Default: /api
 */

// Health check routes
router.use('/health', healthRoutes);

// Add more routes here
// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

export default router;
