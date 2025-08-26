import { Schema, model } from "mongoose";
const userSchema = new Schema({
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
  },

  avatar: {
    type: String,
    default: function () {
      const nameForUrl = encodeURIComponent(this.name);
      return `https://ui-avatars.com/api/?uppercase=true&name=${nameForUrl}&background=0C4A6E&color=38BDF8`;
    },
  },
  title: {
    type: String,
    required: [true, "Title is required field"],
  },
});

export const UserModel = model("User", userSchema);
