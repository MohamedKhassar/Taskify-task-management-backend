import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minLength: [3, "Title must be at least 3 characters"],
      maxLength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, "Description cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // optional: task may be unassigned
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task must have a creator"],
    },
    dueDate: {
      type: Date,
      required: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

export const TaskModel = mongoose.model("Task", taskSchema);
