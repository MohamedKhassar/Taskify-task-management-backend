import { Router } from "express";
import { createTask, getTask, SoftDeleteTaskByIds } from "../controllers/taskController.js";
const taskRoutes = Router();

taskRoutes.post("/create-task", createTask);
taskRoutes.put("/soft-delete",SoftDeleteTaskByIds);
taskRoutes.get("/get-task", getTask);

export default taskRoutes;
