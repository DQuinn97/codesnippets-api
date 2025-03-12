// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import snippetRoutes from "./routes/snippetRoutes";
import viewRoutes from "./routes/viewRoutes";
import { helloMiddleware } from "./middleware/exampleMiddleware";
import mongoose from "mongoose";
import path from "path";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.set("views", path.join(path.resolve(), "/src/views"));
app.set("view engine", "ejs");

// Routes
const api_route = "/api";
app.use(api_route + "/snippets", snippetRoutes);
app.use("/", viewRoutes);
app.all("*", notFound);

// Database connection
try {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("Database connection OK");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
