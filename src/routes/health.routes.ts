import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import os from 'os';

const router = Router();

/**
 * @route   GET /api/health
 * @desc    Basic health check
 * @access  Public
 */
router.get('/', (_req: Request, res: Response) => {
    res.json({
        success: true,
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

/**
 * @route   GET /api/health/detailed
 * @desc    Detailed health check with system info
 * @access  Public
 */
router.get('/detailed', async (_req: Request, res: Response) => {
    const healthcheck = {
        success: true,
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        system: {
            platform: process.platform,
            nodeVersion: process.version,
            memory: {
                total: `${Math.round(os.totalmem() / 1024 / 1024)} MB`,
                free: `${Math.round(os.freemem() / 1024 / 1024)} MB`,
                usage: `${Math.round((1 - os.freemem() / os.totalmem()) * 100)}%`,
            },
            cpus: os.cpus().length,
            loadAverage: os.loadavg(),
        },
        database: {
            status: 'unknown',
            name: 'MongoDB',
        },
    };

    try {
        // Check database connection
        const dbState = mongoose.connection.readyState;
        const dbStates: Record<number, string> = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting',
        };
        healthcheck.database.status = dbStates[dbState] || 'unknown';
    } catch (error) {
        healthcheck.database.status = 'error';
    }

    const httpStatus = healthcheck.database.status === 'connected' ? 200 : 503;
    res.status(httpStatus).json(healthcheck);
});

/**
 * @route   GET /api/health/ready
 * @desc    Readiness probe for Kubernetes/load balancers
 * @access  Public
 */
router.get('/ready', (_req: Request, res: Response) => {
    const isReady = mongoose.connection.readyState === 1;

    if (isReady) {
        res.json({ success: true, ready: true });
    } else {
        res.status(503).json({ success: false, ready: false });
    }
});

/**
 * @route   GET /api/health/live
 * @desc    Liveness probe for Kubernetes/load balancers
 * @access  Public
 */
router.get('/live', (_req: Request, res: Response) => {
    res.json({ success: true, alive: true });
});

export default router;
