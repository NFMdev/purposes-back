import { PrismaClient } from "@prisma/client";

export class TaskService {
    static async createTask(title: string, week: number, goalId: string) {
        const prisma = new PrismaClient();
        return prisma.task.create({
            data: {
                title,
                week,
                goalId
            },
        });
    }

    static async deleteTask(id: string) {
        const prisma = new PrismaClient();

        return prisma.task.delete({
            where: {
                id
            }
        });
    }

    static async updateTask(id: string, title: string, week: number) {
        const prisma = new PrismaClient();
        return prisma.task.update({
            where: {
                id
            },
            data: {
                title,
                week
            }
        });
    }

    static async changeTaskStatus(id: string, completed: boolean) {
        const prisma = new PrismaClient();
        return prisma.task.update({
            where: {
                id
            },
            data: {
                completed
            }
        });
    }

    static async getWeekUserTasks(userId: string, week: number) {
        const prisma = new PrismaClient();
        return prisma.task.findMany({
            where: {
                week,
                goal: {
                    userId
                }
            },
            include: {
                goal: true
            }
        });
    }
}