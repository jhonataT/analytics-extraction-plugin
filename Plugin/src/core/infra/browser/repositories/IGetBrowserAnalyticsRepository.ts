export interface IBrowserAnalyticsRepository {
  getDevice(): string;
  getOS(): string;
  getOrigin(): string;
  getThemeChanges(): number;
};
