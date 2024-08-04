import { AnalyticsDataRepository } from './analytics-data.repository'; 
import { Api } from '../infra/api/api'; 
import { AnalyticsData } from '../entities/analytics-data.entity'; 
import { CreateResponse } from '../@types/response-status'; 

jest.mock('../infra/api/api');

jest.mock("../config/config", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

describe('AnalyticsDataRepository', () => {
  let analyticsDataRepository: AnalyticsDataRepository;

  beforeAll(() => {
    analyticsDataRepository = AnalyticsDataRepository.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance using singleton pattern', () => {
    const instance1 = AnalyticsDataRepository.init();
    const instance2 = AnalyticsDataRepository.init();
    expect(instance1).toBe(instance2);
  });

  it('should save analytics data successfully', async () => {
    const mockResponse: CreateResponse = { status: 'success' };
    const mockAnalyticsData = new AnalyticsData('mobile', 'iOS', 'https://example.com', 3);
    (Api.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await analyticsDataRepository.save(mockAnalyticsData);

    expect(Api.post).toHaveBeenCalledWith('collect', window.ht?.getToken(), mockAnalyticsData);
    expect(response).toEqual(mockResponse);
  });

  it('should handle error when saving analytics data', async () => {
    const mockError = new Error('Network error');
    const mockAnalyticsData = new AnalyticsData('desktop', 'Windows', 'https://example.org', 5);
    (Api.post as jest.Mock).mockRejectedValue(mockError);

    const response = await analyticsDataRepository.save(mockAnalyticsData);

    expect(Api.post).toHaveBeenCalledWith('collect', window.ht?.getToken(), mockAnalyticsData);
    expect(response).toEqual({ error: 'Erro ao salvar os dados' });
  });
});
