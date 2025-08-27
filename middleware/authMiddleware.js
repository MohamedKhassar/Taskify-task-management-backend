import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Optionally: check in cookies
  // token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (without password)
    req.user = await UserModel.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
