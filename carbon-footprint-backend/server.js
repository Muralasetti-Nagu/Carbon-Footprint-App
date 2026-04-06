import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db, { connectDB } from './db.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Basic route check
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Connect to database FIRST, then start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✓ Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
