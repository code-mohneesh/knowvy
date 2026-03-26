import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression'; // gzip — shrinks JSON ~60-70%


import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import ttsRoutes from './routes/ttsRoutes.js';
import hostRoutes from './routes/hostRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import hackathonRoutes from './routes/hackathonRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import mentorshipRoutes from './routes/mentorshipRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();
connectDB();


const app = express();

/* ======================
   GLOBAL MIDDLEWARE
   ====================== */

/**
 * DSA Concept Applied → GREEDY ALGORITHM (Huffman-style entropy coding)
 * gzip uses LZ77 + Huffman coding under the hood — the same principle
 * behind optimal prefix-free compression trees. Repetitive JSON keys
 * ("_id", "name", "email" repeated 100× in a list) compress extremely well.
 * Result: ~70% smaller payloads → faster network transfer → lower LCP.
 */
app.use(compression({ level: 6 })); // level 6 = best speed/size trade-off

/**
 * ETags → Conditional GET pattern (like a hash map lookup)
 * Express generates an ETag hash of the response body.
 * Browser sends `If-None-Match` header on 2nd request.
 * If data unchanged → server returns 304 (Not Modified) with NO body.
 * This is O(1) cache hit — zero bytes transferred for unchanged data.
 */
app.set('etag', 'strong');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from uploads directory — with aggressive caching
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Cache uploaded images for 7 days — images don't change, so browser reuses them
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '7d',
  etag: true,
  lastModified: true,
}));




/* ======================
   ROUTES
   ====================== */
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes); // Profile routes mounted here
app.use('/api/ai', aiRoutes);
app.use('/api/tts', ttsRoutes);
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/host', hostRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/feedback', feedbackRoutes);

/* ======================
   ROOT ROUTE
   ====================== */
app.get('/', (req, res) => {
   res.send('API is running...');
});

/* ======================
   404 HANDLER (REQUIRED)
   ====================== */
app.use((req, res, next) => {
   const error = new Error(`Not Found - ${req.originalUrl}`);
   res.status(404);
   next(error);
});

/* ======================
   ERROR HANDLER
   ====================== */
app.use(errorHandler);

/* ======================
   SERVER START
   ====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
   console.log(`Server running on port ${PORT}`)
);

// Trigger restart for env update
