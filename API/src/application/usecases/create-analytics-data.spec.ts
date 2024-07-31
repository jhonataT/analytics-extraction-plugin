import { CreateAnalyticsData } from "./create-analytics-data.usecase";

describe('Create analytics data use case', () => {
  it('Should be able to create a new analytics data', async () => {
    const systemUndertest = new CreateAnalyticsData();
    
    const response = await systemUndertest.execute({
      device: 'desktop',
      os: 'windows',
      sourceDomainUrl: 'http://localhost:3001',
      themeChangeCount: 4
    });

    expect(response).toBeTruthy();
  });
});