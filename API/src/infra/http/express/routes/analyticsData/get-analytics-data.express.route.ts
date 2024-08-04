import { Request, Response } from "express";
import { GetAnalyticsData } from "../../../../../application/usecases/analyticsData/get-analytics-data.usecase";
import { HttpMethod, Route } from "../route";

type GetAnalyticsDataRequestDto = {
  id?: string;
};

type GetAnalyticsDataResponseDto = {
  device: 'android' | 'ios' | 'desktop';
  os: string;
  sourceDomainUrl: string;
  themeChangeCount: number;
  responsibleToken: string;
  id: string;
  createdAt: Date;
};

export class GetAnalyticsDataRoute implements Route {
  static instance: GetAnalyticsDataRoute;
  
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getAnalyticsDataService: GetAnalyticsData,
  ) {};

  public static create(getAnalyticsDataService: GetAnalyticsData) {
    // Singleton Pattern
    if(!GetAnalyticsDataRoute.instance) {
      GetAnalyticsDataRoute.instance = new GetAnalyticsDataRoute(
        "/list",
        HttpMethod.GET,
        getAnalyticsDataService
      );
    }

    return GetAnalyticsDataRoute.instance;
  };

  public getHandler(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      try {
        const responsible = req.query.id as string;
        const params = { id: responsible };

        const analyticsData: GetAnalyticsDataResponseDto | GetAnalyticsDataResponseDto[] = 
          await this.getAnalyticsDataService.execute(params);

        res.status(200).json(analyticsData);
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(400).json({ error: 'An unknown error occurred' });
        }
      }
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
