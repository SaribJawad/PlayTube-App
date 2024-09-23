import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import serverless from "serverless-http";

dotenv.config({
  path: "./.env",
});

connectDB().catch((error) => {
  console.log("MONGODB connection failed !!! ", error);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export const handler = serverless(app);
