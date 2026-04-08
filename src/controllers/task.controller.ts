import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export const TaskController = {
    createTask: async (req: Request, res: Response) => {
        const { title, week, goalId } = req.body;
        try {
            const task = await TaskService.createTask(title, week, goalId);
            res.status(201).json(task);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteTask: async (req: Request, res: Response) => {
        const { id } = req.body;
        try {
            const task = await TaskService.deleteTask(id);
            res.status(200).json(task);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    getWeekUserTasks: async (req: Request, res: Response) => {
        const { userId, week } = req.body;
        try {
            const tasks = await TaskService.getWeekUserTasks(userId, week);
            res.status(200).json(tasks);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    updateTask: async (req: Request, res: Response) => {
        const { id, title, week } = req.body;
        try {
            const task = await TaskService.updateTask(id, title, week);
            res.status(200).json(task);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    changeTaskStatus: async (req: Request, res: Response) => {
        const { id, completed } = req.body;
        try {
            const task = await TaskService.changeTaskStatus(id, completed);
            res.status(200).json(task);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}