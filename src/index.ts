import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import taskRoutes from "./interfaces/routes/taskRoutes";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

const start = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
    process.exit(1);
  }
};

start();
