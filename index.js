const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { authRoutes } = require("./routes/authRoutes");
const connectDB = require("./connectDB");
const FRONT_ORIGIN = process.env.FRONT_ORIGIN || "http://localhost:5173";

connectDB();
dotenv.config();

app.use(cors({ origin: FRONT_ORIGIN }));
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
