import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/database.js';
import { initFirebaseAdmin, isFirebaseAdminReady } from './config/firebaseAdmin.js';
import authRoutes from './routes/authRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import siteRoutes from './routes/siteRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// ─── Load environment variables ───────────────────────────────────────────────
dotenv.config();
initFirebaseAdmin();

if (process.env.NODE_ENV === 'production' && !isFirebaseAdminReady()) {
    console.warn(
        '⚠️  FIREBASE_SERVICE_ACCOUNT_JSON is not set — customer phone login (/api/auth/firebase-verify) will fail until you add it.'
    );
}

// ─── Validate required environment variables at startup ───────────────────────
const REQUIRED_ENV_VARS = ['MONGODB_URI', 'JWT_SECRET'];

const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
    console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
    console.error('   Set them in your .env file (local) or Render → Environment (production).');
    process.exit(1);
}

// ─── App setup ────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;
const IS_PROD = process.env.NODE_ENV === 'production';

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

// ─── Security middleware ──────────────────────────────────────────────────────
app.use(helmet());

// ─── CORS ─────────────────────────────────────────────────────────────────────
// In production set FRONTEND_URL to your deployed frontend URL(s).
// Multiple origins are supported via a comma-separated list, e.g.:
//   https://my-shop.vercel.app,https://my-admin.netlify.app
const buildCorsOrigin = () => {
    if (!IS_PROD) return true; // Allow all in development

    const raw = process.env.FRONTEND_URL;
    if (!raw || !raw.trim()) {
        // No frontend URL set — allow all (useful during initial setup)
        console.warn('⚠️  FRONTEND_URL not set. CORS is open to all origins.');
        return true;
    }

    const origins = raw
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);

    return origins.length === 1 ? origins[0] : origins;
};

app.use(
    cors({
        origin: buildCorsOrigin(),
        credentials: true,
    })
);

// ─── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// ─── HTTP request logging ─────────────────────────────────────────────────────
// 'dev' in development, 'combined' (Apache-style) in production for log aggregators
app.use(morgan(IS_PROD ? 'combined' : 'dev'));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({
        message: 'Ecommerce API is running...',
        version: '1.0.0',
        status: 'healthy',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
    });
});

// ─── API routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/site', siteRoutes);

// ─── Error handling (must come after routes) ──────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start server ─────────────────────────────────────────────────────────────
// Bind to 0.0.0.0 — required by Render and other cloud hosts
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server listening on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// ─── Graceful shutdown ────────────────────────────────────────────────────────
const shutdown = (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
    });

    // Force-kill if graceful shutdown takes too long (Render gives 10 s)
    setTimeout(() => {
        console.error('⚠️  Forced shutdown after timeout');
        process.exit(1);
    }, 9000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// ─── Global error guards ──────────────────────────────────────────────────────
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    // Do NOT crash on unhandled rejections — log and continue
});

process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    shutdown('uncaughtException');
});

export default app;
