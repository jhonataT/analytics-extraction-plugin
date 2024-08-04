import { GetAnalyticsData } from '../usecases/get-analytics-data.usecase';
import { AnalyticsData } from '../entities/analytics-data.entity';
import { IBrowserAnalyticsRepository } from '../infra/browser/repositories/IGetBrowserAnalyticsRepository';

const mockGetDevice = jest.fn();
const mockGetOS = jest.fn();
const mockGetOrigin = jest.fn();
const mockGetThemeChanges = jest.fn();

const mockAnalyticsRepository: IBrowserAnalyticsRepository = {
  getDevice: mockGetDevice,
  getOS: mockGetOS,
  getOrigin: mockGetOrigin,
  getThemeChanges: mockGetThemeChanges,
};

describe('GetAnalyticsData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a singleton instance', () => {
    const instance1 = GetAnalyticsData.init(mockAnalyticsRepository);
    const instance2 = GetAnalyticsData.init(mockAnalyticsRepository);

    expect(instance1).toBe(instance2);
  });

  it('should execute and return formatted AnalyticsData', () => {
    const device = 'Desktop';
    const os = 'Windows';
    const origin = 'example.com';
    const themeChanges = 3;

    mockGetDevice.mockReturnValue(device);
    mockGetOS.mockReturnValue(os);
    mockGetOrigin.mockReturnValue(origin);
    mockGetThemeChanges.mockReturnValue(themeChanges);

    const analyticsData = GetAnalyticsData.init(mockAnalyticsRepository).execute();

    expect(analyticsData).toBeInstanceOf(AnalyticsData);
    expect(analyticsData.device).toBe(device);
    expect(analyticsData.os).toBe(os);
    expect(analyticsData.sourceDomainUrl).toBe(origin);
    expect(analyticsData.themeChangeCount).toBe(themeChanges);

    expect(mockGetDevice).toHaveBeenCalled();
    expect(mockGetOS).toHaveBeenCalled();
    expect(mockGetOrigin).toHaveBeenCalled();
    expect(mockGetThemeChanges).toHaveBeenCalled();
  });
});
