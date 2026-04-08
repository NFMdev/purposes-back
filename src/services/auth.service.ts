import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
    static async signin(email: string, password: string, name: string) {
        const prisma = new PrismaClient();
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
    }

    static async login(email: string, password: string) {
        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({where: { email }});
        if (!user) throw new Error('Invalid credentials');
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error('Invalid credentials');

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET!,
            {expiresIn: '7d'}
        );

        return {user, token};
    }

    static async recoverPassword(email: string) {
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({where: { email }});
        if (!user) throw new Error('User not found');

        // TODO: Implement password recovery logic (e.g., send email with reset link)
        return user;
    }
}