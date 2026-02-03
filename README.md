# Ishwardi Backend

A professional Express.js + TypeScript backend API with industry-standard configuration and best practices.

## Features

- 🚀 **Express.js 5** with TypeScript
- 🔐 **Security** - Helmet, CORS, rate limiting ready
- ✅ **Validation** - Zod-based request validation
- 📝 **Logging** - Winston with file rotation
- 🗄️ **Database** - MongoDB with Mongoose
- 📧 **Email** - Nodemailer integration
- ☁️ **Cloud Storage** - Cloudinary integration
- 🔄 **Graceful Shutdown** - Proper lifecycle management
- 📖 **API Documentation** - Swagger ready

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- MongoDB
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
```

### Development

```bash
# Start development server with hot reload
npm run dev
```

### Production

```bash
# Build for production
npm run build:prod

# Start production server
npm start
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm run build:prod` | Production build (no source maps) |
| `npm start` | Start production server |
| `npm run clean` | Remove dist folder |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run typecheck` | TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## Project Structure

```
src/
├── config/          # Configuration & environment
│   ├── env.ts       # Zod-validated environment config
│   ├── connect.db.ts # Database connection
│   └── index.ts     # Config exports
├── middleware/      # Express middleware
│   ├── asyncHandler.ts  # Async wrapper
│   ├── errorHandler.ts  # Error handling
│   ├── validate.ts      # Request validation
│   └── index.ts
├── routes/          # API routes
│   ├── health.routes.ts # Health check endpoints
│   └── index.ts
├── types/           # TypeScript types
│   ├── express.d.ts # Express extensions
│   └── index.ts
├── utils/           # Utility functions
│   ├── logger.ts    # Winston logger
│   ├── response.ts  # API response helpers
│   └── index.ts
├── app.ts           # Express app configuration
├── server.ts        # Server startup & lifecycle
└── index.ts         # Entry point
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `API_PREFIX` | API route prefix | `/api` |
| `MONGO_URI` | MongoDB connection string | Required |
| `CORS_ORIGIN` | Allowed CORS origins | `*` |
| `LOG_LEVEL` | Logging level | `info` |

See `.env.example` for full configuration options.

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Basic health check |
| GET | `/api/health/detailed` | Detailed system info |
| GET | `/api/health/ready` | Readiness probe |
| GET | `/api/health/live` | Liveness probe |

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "statusCode": 400
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "requestId": "uuid"
}
```

## Adding New Routes

1. Create route file in `src/routes/`:

```typescript
import { Router } from 'express';
import { asyncHandler } from '@/middleware';
import { sendSuccess } from '@/utils/response';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
    sendSuccess(res, { message: 'Hello World' });
}));

export default router;
```

2. Register in `src/routes/index.ts`:

```typescript
import newRoutes from './new.routes';
router.use('/new', newRoutes);
```

## License

ISC
