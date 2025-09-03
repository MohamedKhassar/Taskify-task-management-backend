import { Router } from "express";
import {
  createTask,
  DeleteTaskByIds,
  EditTask,
  getTask,
  SoftDeleteTaskByIds,
  UndoDeleteTaskByIds,
} from "../controllers/taskController.js";
const taskRoutes = Router();

taskRoutes.post("/create-task", createTask);
taskRoutes.put("/soft-delete", SoftDeleteTaskByIds);
taskRoutes.put("/undo-delete", UndoDeleteTaskByIds);
taskRoutes.put("/edit-task/:id", EditTask);
taskRoutes.delete("/delete", DeleteTaskByIds);
taskRoutes.get("/get-task", getTask);

export default taskRoutes;
