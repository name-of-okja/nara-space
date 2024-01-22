import * as express from 'express';
import { Request, Response } from 'express';
import apiRoutes from './api/api.routes';
import { errorMiddleware } from './middleware';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import * as path from 'path';

const app = express();

// Middleware
{
  app.use(express.json());
}

// Routing
{
  const swaggerSpec = YAML.load(path.join(__dirname, '../dist/swagger.yaml'));
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { customSiteTitle: 'Nara Space' })
  );
  app.use('/api', apiRoutes);
}

// Error Handler
{
  app.get('*', (req: Request, res: Response) => {
    res.status(505).json({ message: 'Bad Request' });
  });

  app.use(errorMiddleware);
}

export default app;
