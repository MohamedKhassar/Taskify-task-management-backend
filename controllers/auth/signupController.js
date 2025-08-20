const UserModel = require("../../models/UserModel");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create new user
    const newUser = await UserModel.create({ name, email, password });
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(
        (e) => e.properties.message
      );
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUp };
