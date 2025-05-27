import express from 'express';
import cors from 'cors';
import { RegisterRoutes } from './generated/routes';
import appConfig from './config';
import { AppDataSource } from './models';
import swaggerUi from 'swagger-ui-express';

// main entry point for the server
async function startServer() {
  // init typeorm config
  await AppDataSource.initialize();

  const app = express();

  // ========== Middlewares ==========
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ========== Routes ==========
  RegisterRoutes(app);

  // ========== Optional: Health Check ==========
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // ========== Optional: Swagger UI ==========
  const swaggerDocument = require('../swagger.json');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log(
    `Swagger docs available at http://localhost:${appConfig.PORT}/docs`,
  );

  app.listen(appConfig.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${appConfig.PORT}`);
    console.log(`📘 API ready at /api/v1`);
  });
}

startServer().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
