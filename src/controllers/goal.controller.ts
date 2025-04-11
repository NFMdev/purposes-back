import { Request, Response } from "express";
import { GoalService } from "../services/goal.service";

export class GoalController {
    static async createGoal(req: Request, res: Response) {
        const { title, userId } = req.body;

        try {
            const goal = await GoalService.createGoal(title, userId);
            res.status(201).json(goal);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteGoal(req: Request, res: Response) {
        const { goalId } = req.body;

        try {
            const goal = await GoalService.deleteGoal(goalId);
            res.status(200).json(goal);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUserGoals(req: Request, res: Response) {
        const { userId } = req.body;

        try {
            const goals = await GoalService.getUserGoals(userId);
            res.status(200).json(goals);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}