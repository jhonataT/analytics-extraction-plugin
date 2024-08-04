import { SaveAnalyticsData } from '../usecases/save-analytics-data.usecase';
import { AnalyticsData } from '../entities/analytics-data.entity';
import { IAnalyticsDataRepository } from '../repositories/IAnalyticsDataRepository';
import { CreateResponse } from '../@types/response-status';

const mockSave = jest.fn();

const mockAnalyticsDataRepository: IAnalyticsDataRepository = {
  save: mockSave,
};

describe('SaveAnalyticsData', () => {
  let saveAnalyticsData: SaveAnalyticsData;
  const mockAnalyticsData = new AnalyticsData('device', 'os', 'origin', 5);
  const mockResponse: CreateResponse = { status: 'success' };

  beforeEach(() => {
    jest.clearAllMocks();
    saveAnalyticsData = SaveAnalyticsData.init(mockAnalyticsDataRepository, mockAnalyticsData);
  });

  it('should create a singleton instance', () => {
    const instance1 = SaveAnalyticsData.init(mockAnalyticsDataRepository, mockAnalyticsData);
    const instance2 = SaveAnalyticsData.init(mockAnalyticsDataRepository, mockAnalyticsData);

    expect(instance1).toBe(instance2);
  });

  it('should execute and call save method with correct data', async () => {
    mockSave.mockResolvedValue(mockResponse);

    const response = await saveAnalyticsData.execute();

    expect(response).toEqual(mockResponse);
    expect(mockSave).toHaveBeenCalledWith(mockAnalyticsData);
    expect(mockSave).toHaveBeenCalledTimes(1);
  });
});
