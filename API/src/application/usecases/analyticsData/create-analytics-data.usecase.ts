import { AnalyticsData } from "../../../domain/entities/analytics-data.entity";
import { ResponsibleTokenRepository } from "../../repositories/responsible-token-repository";

type CreateAnalyticsDataRequest = {
  device: 'android' | 'ios' | 'desktop';
  os: string;
  sourceDomainUrl: string;
  themeChangeCount: number;
  responsibleToken: string;
};

type CreateAnalyticsDataResponse = {
  id: string;
};

export class CreateAnalyticsData {
  constructor(
    private responsibleTokenRepository: ResponsibleTokenRepository,
  ) {};

  async execute({
    device,
    os,
    sourceDomainUrl,
    themeChangeCount,
    responsibleToken
  }: CreateAnalyticsDataRequest): Promise<string> {
    const responsible = await this.responsibleTokenRepository.getResponsibleToken(responsibleToken);

    if(!responsible) {
      throw new Error('Responsible token is not valid!');
    }

    const analyticsData = AnalyticsData.create({
      device,
      os,
      sourceDomainUrl,
      themeChangeCount,
      responsibleToken
    });

    return analyticsData;
  };
};