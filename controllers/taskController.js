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
    let tasks = await TaskModel.find({
      createdBy: userObjectId,
    });
    if (tasks.length > 0) {
      return res.status(200).json(tasks);
    }

    return res.status(404).json({ message: "No tasks found" });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const SoftDeleteTaskByIds = async (req, res) => {
  try {
    const Ids = req.body || [];

    await TaskModel.updateMany(
      { _id: { $in: Ids } },
      { $set: { deletedAt: new Date() } }
    );

    res.status(200).json({
      message: `${Ids.length} Task${
        Ids.length > 1 ? "s have been" : " has been"
      } Moved to Trash Successfully`,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const UndoDeleteTaskByIds = async (req, res) => {
  try {
    const Ids = req.body || [];

    await TaskModel.updateMany(
      { _id: { $in: Ids } },
      { $set: { deletedAt: null } }
    );

    res.status(200).json({
      message: `${Ids.length} Task${
        Ids.length > 1 ? "s have been" : " has been"
      } Restored Successfully`,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const DeleteTaskByIds = async (req, res) => {
  try {
    const Ids = req.body || [];
    await TaskModel.deleteMany({ _id: { $in: Ids } });

    res.status(200).json({
      message: `${Ids.length} Task${
        Ids.length > 1 ? "s have been" : " has been"
      } Deleted Successfully`,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const EditTask = async (req, res) => {
  try {
    const data = req.body || {};
    const { id } = req.params;

    const UpdatedTask = await TaskModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    res.status(201).json({
      message: "Task updated successfully",
      task: UpdatedTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
