import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authMiddleware } from "../auth.middleware";

const taskRoutes = Router();

taskRoutes.post("/create", authMiddleware, TaskController.createTask);
taskRoutes.delete("/delete", authMiddleware, TaskController.deleteTask);
taskRoutes.post("/week-user-tasks", authMiddleware, TaskController.getWeekUserTasks);
taskRoutes.put("/update", authMiddleware, TaskController.updateTask);
taskRoutes.put("/change-status", authMiddleware, TaskController.changeTaskStatus);

export default taskRoutes;