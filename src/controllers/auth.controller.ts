import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const AuthController = {
    signin: async (req: Request, res: Response) => {
        try {
            const user = await AuthService.signin(req.body.email, req.body.password, req.body.name);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { user, token } = await AuthService.login(req.body.email, req.body.password);
            res.status(200).json({ user, token });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },
    recoverPassword: async (req: Request, res: Response) => {
        try {
            const user = await AuthService.recoverPassword(req.body.email);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}