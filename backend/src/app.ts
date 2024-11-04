import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", routes);

// Test database connection
prisma
  .$connect()
  .then(() => {
    console.log("Connected to MongoDB via Prisma");
  })
  .catch((err: unknown) => {
    console.error("Failed to connect to MongoDB:", err);
  });

export default app;
