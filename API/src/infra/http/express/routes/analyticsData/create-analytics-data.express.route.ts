import { Request, Response } from "express";
import { CreateAnalyticsData } from "../../../../../application/usecases/analyticsData/create-analytics-data.usecase";
import { HttpMethod, Route } from "../route";

type CreateCollectRequestDto = {
  device: 'android' | 'ios' | 'desktop';
  os: string;
  sourceDomainUrl: string;
  themeChangeCount: number;
  responsibleToken: string;
};

export type CreateCollectResponseDto = {
  id: string;
};

export class CreateAnalyticsDataRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createAnalyticsDataService: CreateAnalyticsData,
  ) {};

  public static create(createCollectService: CreateAnalyticsData) {
    return new CreateAnalyticsDataRoute(
      "/collect",
      HttpMethod.POST,
      createCollectService
    );
  };

  public getHandler(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const body: CreateCollectRequestDto = req.body;

      const analyticsDataId: string =
        await this.createAnalyticsDataService.execute(body);

      const responseBody = this.present(analyticsDataId);
      res.status(201).json(responseBody);
    };
  };

  private present(analyticsDataId: string): CreateCollectResponseDto {
    return { id: analyticsDataId };
  };

  public getPath(): string {
    return this.path;
  };

  public getMethod(): HttpMethod {
    return this.method;
  };
};
