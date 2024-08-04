import { CreateResponse } from "../@types/response-status";
import { AnalyticsData } from "../entities/analytics-data.entity";

export interface IAnalyticsDataRepository {
  save(analyticsData: AnalyticsData): Promise<CreateResponse>;
};