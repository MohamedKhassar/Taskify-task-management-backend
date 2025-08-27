import mongoose from "mongoose";
import { TaskModel } from "../models/TaskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo, dueDate, priority } =
      req.body || {};

    const newTask = await TaskModel.create({
      title,
      description,
      status,
      assignedTo,
      dueDate,
      priority,
      createdBy: req.user._id, // set creator from auth middleware
    });

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    // console.error("Create Task error:", error);

    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ errors });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTask = async (req, res) => {
  try {
    const userObjectId = req.user._id;
    const tasks = await TaskModel.find({createdBy:userObjectId});
    if (tasks.length > 0) {
      return res.status(200).json(tasks);
    }

    return res.status(404).json({ message: "No tasks found" });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
