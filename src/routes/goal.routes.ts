import { Router } from "express";
import { GoalController } from "../controllers/goal.controller";
import { authMiddleware } from "../auth.middleware";

const goalRoutes = Router();

goalRoutes.post("/create", authMiddleware, GoalController.createGoal);
goalRoutes.delete("/delete", authMiddleware, GoalController.deleteGoal);
goalRoutes.post("/user-goals", authMiddleware, GoalController.getUserGoals);

export default goalRoutes;