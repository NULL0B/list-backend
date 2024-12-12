import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import taskRoutes from "./interfaces/routes/taskRoutes";

// Initialize Firebase Admin
admin.initializeApp();
// Set configs as environment variables
const config = functions.config();
process.env.DATABASE_URL = config.database.url;

const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to Prisma before handling any requests
app.use(async (req, res, next) => {
  try {
    await prisma.$connect();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Export the Express app as a Firebase Cloud Function
export const api = functions.https.onRequest(app);
