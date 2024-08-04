
import { CreateResponse } from '../@types/response-status';
import { AnalyticsData } from '../entities/analytics-data.entity'; 
import { IAnalyticsDataRepository } from '../repositories/IAnalyticsDataRepository';

export class SaveAnalyticsData {
  constructor(
    private analyticsDataRepository: IAnalyticsDataRepository,
    private analyticsData: AnalyticsData
  ) {};

  async execute(): Promise<CreateResponse> {
    return await this.analyticsDataRepository.save(this.analyticsData);
  };
};
