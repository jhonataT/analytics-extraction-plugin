
import { CreateResponse } from '../@types/response-status';
import { AnalyticsData } from '../entities/analytics-data.entity'; 
import { IAnalyticsDataRepository } from '../repositories/IAnalyticsDataRepository';

export class SaveAnalyticsData {
  static instance: SaveAnalyticsData;
  
  private constructor(
    private analyticsDataRepository: IAnalyticsDataRepository,
    private analyticsData: AnalyticsData
  ) {};

  static init(analyticsDataRepository: IAnalyticsDataRepository, analyticsData: AnalyticsData) {
    if(!SaveAnalyticsData.instance) {
      SaveAnalyticsData.instance = new SaveAnalyticsData(analyticsDataRepository, analyticsData);
    };

    return SaveAnalyticsData.instance;
  }

  async execute(): Promise<CreateResponse> {
    return await this.analyticsDataRepository.save(this.analyticsData);
  };
};
