import cors from 'cors';
import express, { Application } from 'express';
import { router as apiRouter } from './routes/index';
import rateLimitMiddleware from '../../rateLimiter/middlewares/rate-limit.middleware';

class ApiExpress {
  private app: Application;

  private constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  };

  static create(middlewares: any[]): ApiExpress {
    const instance = new ApiExpress();
    middlewares.forEach(middleware => {
      instance.app.use(middleware);
    });
    return instance;
  };

  private setupMiddlewares(): void {
    this.app.use(cors({ origin: 'http://localhost:3001' }));
    // this.app.use(rateLimitMiddleware);
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
