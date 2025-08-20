const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required field"],
    minLength: [3, "Name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required field"],
    unique: [true, "Email is already used"],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required field"],
    minlength: [8, "Password must be at least 8 characters"],
    validate: {
      validator: function (value) {
        // Example: At least one uppercase, one lowercase, one number, one special character
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
          value
        );
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    },
  },
  avatar: {
    type: String,
    default: function () {
      const nameForUrl = encodeURIComponent(this.name);
      return `https://ui-avatars.com/api/?uppercase=true&name=${nameForUrl}&background=0C4A6E&color=38BDF8`;
    },
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
