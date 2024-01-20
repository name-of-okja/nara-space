import * as express from 'express';
import { Request, Response } from 'express';
import apiRoutes from './api/api.routes';
import { errorMiddleware } from './middleware';

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);
app.get('*', (req: Request, res: Response) => {
  res.status(505).json({ message: 'Bad Request' });
});

app.use(errorMiddleware);
export default app;
