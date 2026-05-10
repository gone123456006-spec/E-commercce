import mongoose from 'mongoose';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

const connectDB = async (retryCount = 0) => {
    const uri = process.env.MONGODB_URI;

    if (!uri || typeof uri !== 'string' || !uri.trim()) {
        console.error(
            '❌ MONGODB_URI is missing or invalid.\n' +
            '   Add it in your .env file (local) or Render → Environment (production).\n' +
            '   Example: mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/ecommerce_db'
        );
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(uri.trim());
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        // ── Connection event handlers ────────────────────────────────────────
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB runtime error:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️  MongoDB disconnected — Mongoose will auto-reconnect');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });

    } catch (error) {
        console.error(`❌ MongoDB connection failed (attempt ${retryCount + 1}/${MAX_RETRIES}):`, error.message);

        if (retryCount + 1 >= MAX_RETRIES) {
            console.error('❌ Maximum retries reached. Exiting process.');
            process.exit(1);
        }

        console.log(`🔄 Retrying in ${RETRY_DELAY_MS / 1000}s...`);
        setTimeout(() => connectDB(retryCount + 1), RETRY_DELAY_MS);
    }
};

export default connectDB;
