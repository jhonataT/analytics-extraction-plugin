import { Request, Response } from "express";
import { CreateAnalyticsData } from "../../../../../application/usecases/analyticsData/create-analytics-data.usecase";
import { HttpMethod, Route } from "../route";

type CreateCollectRequestDto = {
  device: 'android' | 'ios' | 'desktop';
  os: string;
  sourceDomainUrl: string;
  themeChangeCount: number;
};

export type CreateCollectResponseDto = {
  id: string;
};

export class CreateAnalyticsDataRoute implements Route {
  static instance: CreateAnalyticsDataRoute;
  
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createAnalyticsDataService: CreateAnalyticsData,
  ) {};

  public static create(createAnalyticsDataService: CreateAnalyticsData) {
    // Singleton Pattern
    if(!CreateAnalyticsDataRoute.instance) {
      CreateAnalyticsDataRoute.instance = new CreateAnalyticsDataRoute(
        "/collect",
        HttpMethod.POST,
        createAnalyticsDataService
      );
    }

    return CreateAnalyticsDataRoute.instance;
  };

  public getHandler(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      try {
        const token = req.headers['authorization']?.replace('Bearer ', '');

        if(!token) {
          res.status(400).json({ error: 'token not found' });
          return;
        }

        const body: CreateCollectRequestDto = req.body;
        const analyticsData: CreateCollectResponseDto = await this.createAnalyticsDataService.execute({
          ...body,
          token
        });
        const responseBody = this.present(analyticsData);

        res.status(201).json(responseBody);
      } catch (error) {
        if (error instanceof Error)
          res.status(400).json({ error: error.message });
        else
          res.status(400).json({ error: 'An unknown error occurred' });
      }
    };
  };

  private present(analyticsData: CreateCollectResponseDto): CreateCollectResponseDto {
    return { id: analyticsData.id };
  };

  public getPath(): string {
    return this.path;
  };

  public getMethod(): HttpMethod {
    return this.method;
  };
}
