import express from "express";
import cors from "cors";
const app = express();
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./connectDB.js";
const FRONT_ORIGIN = process.env.FRONT_ORIGIN || "http://localhost:5173";
const PORT = process.env.PORT;
const HOST = process.env.HOST;

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
app.use(cors({ origin: [FRONT_ORIGIN,"http://192.168.1.3:5173"] }));
app.use("/api/auth", authRoutes);

app.listen(PORT, HOST, () => {
  console.log("Server is running on port 8080");
});
