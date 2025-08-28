import express from "express";
import cors from "cors";
const app = express();
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./connectDB.js";
import taskRoutes from "./routes/taskRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
const FRONT_ORIGIN = process.env.FRONT_ORIGIN || "http://localhost:5173";
const PORT = process.env.PORT;

connectDB();
config();

app.use(
  express.json({
    strict: true,
    verify: (req, res, buf, encoding) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        throw new SyntaxError("Invalid JSON");
      }
    },
  })
);

// Global error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.message.includes("JSON")) {
    return res.status(400).json({ message: "Malformed JSON in request body" });
  }
  next(err);
});
app.use(express.urlencoded({ extended: true })); // for form data
app.use(
  cors({
    origin: FRONT_ORIGIN,
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api", protect, taskRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 8080");
});
