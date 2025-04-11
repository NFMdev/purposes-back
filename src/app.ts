import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import goalRoutes from './routes/goal.routes';
import taskRoutes from './routes/task.routes';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth-svc', authRoutes)
app.use('/api/goal-svc', goalRoutes);
app.use('/api/task-svc', taskRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('¡API con TypeScript funcionando!');
});

export default app;
