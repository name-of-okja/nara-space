import * as express from 'express';
import apiRoutes from './api/api.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// middleware
app.use(express.json());
app.use(errorHandler);

// routes
app.use('/api', apiRoutes);

export default app;
