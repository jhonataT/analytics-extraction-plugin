import express, { Application } from 'express';
import { router as apiRouter } from './routes/index';

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
