import { AnalyticsData } from "../../domain/entities/analytics-data.entity";

type CreateAnalyticsDataRequest = {
  device: 'android' | 'ios' | 'desktop';
  os: string;
  sourceDomainUrl: string;
  themeChangeCount: number;
};

export class CreateAnalyticsData {
  async execute({ device, os, sourceDomainUrl, themeChangeCount }: CreateAnalyticsDataRequest) {
    const analyticsData = AnalyticsData.create({
      device,
      os,
      sourceDomainUrl,
      themeChangeCount
    });

    return analyticsData;
  };
};