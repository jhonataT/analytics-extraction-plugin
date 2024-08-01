import { IAnalyticsDataRepository } from "../../application/repositories/IAnalyticsDataRepository"; 
import { AnalyticsData } from "../../domain/entities/analytics-data.entity";

export class InMemoryAnalyticsDataRepository implements IAnalyticsDataRepository {
  public items: AnalyticsData[] = [];

  async save(body: AnalyticsData): Promise<AnalyticsData> {
    this.items.push(body);
    const analyticsData = await this.findById(body.id) as AnalyticsData;

    return analyticsData;
  };

  async findById(id: string): Promise<AnalyticsData | null> {
    const analyticsData = this.items.find(item => item?.id === id);

    return analyticsData || null; 
  }

  async findAll(): Promise<AnalyticsData[]> {
    const analyticsDataList = this.items;

    return analyticsDataList; 
  }
};