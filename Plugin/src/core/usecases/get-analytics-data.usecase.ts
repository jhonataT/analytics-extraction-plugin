
import { AnalyticsData } from '../entities/analytics-data.entity'; 
import { IBrowserAnalyticsRepository } from '../infra/browser/repositories/IGetBrowserAnalyticsRepository';

export class GetAnalyticsData {
  static instance: GetAnalyticsData;
  
  private constructor(
    private analytics: IBrowserAnalyticsRepository
  ) {};

  static init(analytics: IBrowserAnalyticsRepository) {
    // Singleton Pattern
    if(!GetAnalyticsData.instance) {
      GetAnalyticsData.instance = new GetAnalyticsData(analytics);
    };

    return GetAnalyticsData.instance;
  };

  execute(): AnalyticsData {
    const device = this.analytics.getDevice();
    const os = this.analytics.getOS();
    const origin = this.analytics.getOrigin();
    const themeChanges = this.analytics.getThemeChanges();
    
    return new AnalyticsData(device, os, origin, themeChanges);
  };
};
