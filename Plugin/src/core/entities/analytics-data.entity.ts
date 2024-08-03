export class AnalyticsData {
  device: string;
  os: string;
  origin: string;
  themeChanges: number;

  constructor(device: string, os: string, origin: string, themeChanges: number) {
    this.device = device;
    this.os = os;
    this.origin = origin;
    this.themeChanges = themeChanges;
  }
};
