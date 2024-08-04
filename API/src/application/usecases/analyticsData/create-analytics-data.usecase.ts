import { AnalyticsData } from "../../../domain/entities/analytics-data.entity";
import { IResponsibleTokenRepository } from "../../repositories/IResponsibleTokenRepository";
import { IAnalyticsDataRepository } from "../../repositories/IAnalyticsDataRepository"; 

type CreateAnalyticsDataRequest = {
  device: 'android' | 'ios' | 'desktop';
  os: string;
  sourceDomainUrl: string;
  themeChangeCount: number;
  token: string;
};

type CreateAnalyticsDataResponse = {
  id: string;
};

export class CreateAnalyticsData {
  constructor(
    private responsibleTokenRepository: IResponsibleTokenRepository,
    private analyticsDataRepository: IAnalyticsDataRepository
  ) {}

  async execute({
    device,
    os,
    sourceDomainUrl,
    themeChangeCount,
    token
  }: CreateAnalyticsDataRequest): Promise<CreateAnalyticsDataResponse> {
    const responsible = await this.responsibleTokenRepository.getResponsibleToken(token);

    if (!responsible) {
      throw new Error('Responsible token is not valid!');
    };

    const analyticsData = await AnalyticsData.create({
      device,
      os,
      sourceDomainUrl,
      themeChangeCount,
      responsibleToken: responsible.id
    });

    const savedAnalyticsData = await this.analyticsDataRepository.save(analyticsData);

    return { id: savedAnalyticsData.id };
  }
}
