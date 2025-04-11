import { PrismaClient } from "@prisma/client";

export class GoalService {
    static async createGoal(title: string, userId: string) {
        const prisma = new PrismaClient();
        return prisma.goal.create({
            data: {
                title,
                userId,
            },
        });
    }

    static async deleteGoal(id: string) {
        const prisma = new PrismaClient();
        return prisma.goal.delete({
            where: {
                id,
            },
        });
    }

    static async getUserGoals(userId: string) {
        const prisma = new PrismaClient();
        return prisma.goal.findMany({
            where: {
                userId,
            },
        });
    }
}