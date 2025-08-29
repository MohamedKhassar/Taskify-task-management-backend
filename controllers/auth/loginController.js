import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/UserModel.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // ✅ Validate each field individually
    const missingFields = [];
    if (!email) missingFields.push("Email is required");
    if (!password) missingFields.push("Password is required");

    if (missingFields.length > 0) {
      return res.status(400).json({ errors: missingFields });
    }

    // ✅ Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found. Please sign up." });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Respond
    res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        title: existingUser.title,
        avatar:existingUser.avatar
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export default login;
