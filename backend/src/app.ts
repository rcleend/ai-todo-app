import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', routes);

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://db:27017/todoapp';
export const client = new MongoClient(uri, {});

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

export default app; 