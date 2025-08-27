import { Router } from "express";
import { createTask, getTask } from "../controllers/taskController.js";
const taskRoutes = Router();

taskRoutes.post("/create-task", createTask);
taskRoutes.get("/get-task", getTask);

export default taskRoutes;
