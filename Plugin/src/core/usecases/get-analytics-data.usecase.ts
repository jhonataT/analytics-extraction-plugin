
import { AnalyticsData } from '../entities/analytics-data.entity'; 
import { BrowserAnalytics } from '../infra/browser/get-browser-anaytics'; 

export class GetAnalyticsData {
  private analytics: BrowserAnalytics;

  constructor() {
    this.analytics = new BrowserAnalytics();
  }

  execute(): AnalyticsData {
    const device = this.analytics.getDevice();
    const os = this.analytics.getOS();
    const origin = this.analytics.getOrigin();
    const themeChanges = this.analytics.getThemeChanges();
    
    return new AnalyticsData(device, os, origin, themeChanges);
  }
};
