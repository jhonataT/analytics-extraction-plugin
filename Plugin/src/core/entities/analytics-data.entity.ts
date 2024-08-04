export class AnalyticsData {
  device: string;
  os: string;
  sourceDomainUrl: string;
  themeChangeCount: number;

  constructor(device: string, os: string, sourceDomainUrl: string, themeChangeCount: number) {
    this.device = device;
    this.os = os;
    this.sourceDomainUrl = sourceDomainUrl;
    this.themeChangeCount = themeChangeCount;
  }
};
