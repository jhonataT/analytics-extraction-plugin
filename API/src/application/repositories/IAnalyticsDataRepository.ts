import { AnalyticsData } from "../../domain/entities/analytics-data.entity"; 

export interface IAnalyticsDataRepository {
  save(data: AnalyticsData): Promise<AnalyticsData>;
  findById(id: string): Promise<AnalyticsData | null>;
  findAll(): Promise<AnalyticsData[]>;
};
