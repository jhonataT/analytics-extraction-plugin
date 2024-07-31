import { Responsible } from "../../../domain/entities/responsible.entity";
import { InMemoryResponsibleRepository } from "../../../tests/repositories/in-memory-responsible-repository";
import { CreateAnalyticsData } from "./create-analytics-data.usecase";

describe('Create analytics data use case', () => {
  it('Should be able to create a new analytics data', async () => {
    const responsibleRepository = new InMemoryResponsibleRepository();
    const systemUndertest = new CreateAnalyticsData(responsibleRepository);

    const responsible = Responsible.create({
      lastAccess: new Date(),
      lastExtractionsCount: 2,
      token: 'yew872832heyiewehosdisodsd',
    });

    responsibleRepository.items.push(responsible);
    
    const response = await systemUndertest.execute({
      device: 'desktop',
      os: 'windows',
      sourceDomainUrl: 'http://localhost:3001',
      themeChangeCount: 4,
      responsibleToken: responsible.props.token
    });

    expect(response).toBeTruthy();
  });
});