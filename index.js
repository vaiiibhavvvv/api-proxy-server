import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/weather.js';
import rateLimit from 'express-rate-limit';
import apicache from 'apicache';
import morgan from 'morgan';
import { authenticate } from './routes/auth.js';


dotenv.config(); // Load environment variables

const app = express();

// Configurable settings from .env
const RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX || 5; // Default to 5 requests per minute
const RATE_LIMIT_WINDOW_MS = (process.env.RATE_LIMIT_WINDOW_MS || 60) * 1000; // Default 1 minute (60s)

const CACHE_DURATION = process.env.CACHE_DURATION || '5 minutes'; // Default to 5 minutes

// Enable CORS middleware
app.use(cors());

// Rate limiter configuration 
const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS, // Window for rate limit
  max: RATE_LIMIT_MAX, // Maximum requests per windowMs
 statusCode: 429,
  handler: (req,res,next) =>{
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later."
    });
    // Log rate limit exceeded
    console.log(`Rate limit exceeded for IP: ${req.ip} at ${new Date().toISOString()}`);
  }
  
});

// Apply rate limiter to all requests
app.use(limiter);

// Log all requests using morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :remote-addr - :date[iso]'));

// Trust the first proxy if the app is behind a reverse proxy 
 app.set('trust proxy', 1);

// Initialize cache with configurable duration
const cache = apicache.middleware;
app.use(cache(CACHE_DURATION));

// Apply the authentication middleware to the /api route
app.use('/api',authenticate, router);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
