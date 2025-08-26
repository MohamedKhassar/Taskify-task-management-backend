import { UserModel } from "../../models/UserModel.js";
import { genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, title } = req.body || {};

    // Validate each field individually
    const missingFields = [];

    if (!name) missingFields.push("Name is required");
    if (!email) missingFields.push("Email is required");
    if (!password) missingFields.push("Password is required");
    if (!title) missingFields.push("title is required");

    if (missingFields.length > 0) {
      return res.status(400).json({ errors: missingFields });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 1️⃣ Validate password manually (optional, extra safety)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        errors: [
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        ],
      });
    }

    // Hash password
    const salt = await genSalt(10);
    const hashedPwd = await hash(password, salt);

    // Create new user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPwd,
      title: title || "user",
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, title: newUser.title },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User created successfully",
      token, // return token to client
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        title: newUser.title,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(
        (e) => e.properties.message
      );
      return res.status(400).json({ errors });
    }
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
