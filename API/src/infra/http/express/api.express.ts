import cors from 'cors';
import express, { Application } from 'express';
import { router as apiRouter } from './routes/index';
import rateLimitMiddleware from '../../rateLimiter/middlewares/rate-limit.middleware';

class ApiExpress {
  static instance: ApiExpress;
  private app: Application;

  private constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  };

  static create(middlewares: any[]): ApiExpress {
    // Singleton Pattern
    if(!ApiExpress.instance) {
      ApiExpress.instance = new ApiExpress();
    };

    middlewares.forEach(middleware => {
      ApiExpress.instance.app.use(middleware);
    });

    return ApiExpress.instance;
  };

  private setupMiddlewares(): void {
    this.app.use(cors({ origin: 'http://localhost:3001' }));
    this.app.use(express.json());
  };

  private setupRoutes(): void {
    this.app.use('/', apiRouter);
  };

  startServer(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  };
}

export { ApiExpress };
