
import { AnalyticsData } from '../entities/analytics-data.entity'; 
import { IBrowserAnalyticsRepository } from '../infra/browser/repositories/IGetBrowserAnalyticsRepository';

export class GetAnalyticsData {
  constructor(
    private analytics: IBrowserAnalyticsRepository
  ) {};

  execute(): AnalyticsData {
    const device = this.analytics.getDevice();
    const os = this.analytics.getOS();
    const origin = this.analytics.getOrigin();
    const themeChanges = this.analytics.getThemeChanges();
    
    return new AnalyticsData(device, os, origin, themeChanges);
  };
};
