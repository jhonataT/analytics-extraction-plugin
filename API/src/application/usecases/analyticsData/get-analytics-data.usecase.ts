import { AnalyticsData } from "../../../domain/entities/analytics-data.entity";
import { IAnalyticsDataRepository } from "../../repositories/IAnalyticsDataRepository";

type GetAnalyticsDataRequest = {
  id?: string;
};

type GetAnalyticsDataResponse = {
  device: 'android' | 'ios' | 'desktop';
  os: string;
  sourceDomainUrl: string;
  themeChangeCount: number;
  responsibleToken: string;
  id: string;
  createdAt: Date;
};

export class GetAnalyticsData {
  constructor(
    private analyticsDataRepository: IAnalyticsDataRepository
  ) {}

  async execute({
    id
  }: GetAnalyticsDataRequest): Promise<GetAnalyticsDataResponse | GetAnalyticsDataResponse[]> {
    if (id) {
      const savedAnalyticsData = await this.analyticsDataRepository.findById(id);

      if (!savedAnalyticsData) {
        throw new Error('AnalyticsData not found!');
      }

      return { id: savedAnalyticsData.id, ...savedAnalyticsData.props } as GetAnalyticsDataResponse;
    } else {
      const allAnalyticsData = await this.analyticsDataRepository.findAll();

      return allAnalyticsData
        .map((data: AnalyticsData) => ({ id: data.id, ...data.props })) as GetAnalyticsDataResponse[];
    }
  }
}
