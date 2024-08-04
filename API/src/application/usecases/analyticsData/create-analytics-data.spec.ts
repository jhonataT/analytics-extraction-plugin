import { ResponsibleToken } from "../../../domain/entities/responsible-token.entity";
import { InMemoryResponsibleRepository } from "../../../tests/repositories/in-memory-responsible.repository";
import { AnalyticsDataRepository } from "../../repositories/analytics-data-repository";
import { CreateAnalyticsData } from "./create-analytics-data.usecase";
import { AnalyticsData } from "../../../domain/entities/analytics-data.entity";
import { FirebaseAnalyticsDataRepository } from "../../../infra/firebase/repositories/firebase-analytics-data.repository";

jest.mock("../../../infra/firebase/repositories/firebase-analytics-data.repository", () => {
  return {
    FirebaseAnalyticsDataRepository: {
      init: jest.fn().mockReturnValue({
        save: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
      })
    }
  }
});

jest.mock("../../repositories/analytics-data-repository", () => {
  return {
    AnalyticsDataRepository: {
      init: jest.fn().mockReturnValue({
        save: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
      })
    }
  }
});

describe('CreateAnalyticsData use case', () => {
  let createAnalyticsData: CreateAnalyticsData;
  let responsibleRepository: InMemoryResponsibleRepository;
  let analyticsDataRepository: jest.Mocked<AnalyticsDataRepository>;
  let firebaseRepository: jest.Mocked<FirebaseAnalyticsDataRepository>;

  beforeEach(() => {
    firebaseRepository = FirebaseAnalyticsDataRepository.init() as jest.Mocked<FirebaseAnalyticsDataRepository>;
    analyticsDataRepository = AnalyticsDataRepository.init(firebaseRepository) as jest.Mocked<AnalyticsDataRepository>;
    responsibleRepository = new InMemoryResponsibleRepository();
    createAnalyticsData = CreateAnalyticsData.init(responsibleRepository, analyticsDataRepository);
  });

  it('should be able to create a new analytics data', async () => {
    const responsible = ResponsibleToken.create({
      lastAccess: new Date(),
      domain: 'http://localhost:3001',
      token: 'yew872832heyiewehosdisodsd',
    });
  
    responsibleRepository.items.push(responsible);
  
    const analyticsData = await AnalyticsData.create({
      device: 'desktop',
      os: 'windows',
      sourceDomainUrl: 'http://localhost:3001',
      themeChangeCount: 4,
      responsibleToken: responsible.id
    });
  
    analyticsDataRepository.save.mockResolvedValue(analyticsData);
  
    const response = await createAnalyticsData.execute({
      device: 'desktop',
      os: 'windows',
      sourceDomainUrl: 'http://localhost:3001',
      themeChangeCount: 4,
      token: responsible.props.token as string
    });
  
    expect(response).toEqual({ id: analyticsData.id });
  
    let [savedData] = analyticsDataRepository.save.mock.calls[0];
    
    const expectedData = {
      device: 'desktop',
      os: 'windows',
      sourceDomainUrl: 'http://localhost:3001',
      themeChangeCount: 4,
      responsibleToken: responsible.id
    };

    expect({
      device: savedData.props.device,
      os:  savedData.props.os,
      sourceDomainUrl:  savedData.props.sourceDomainUrl,
      themeChangeCount:  savedData.props.themeChangeCount,
      responsibleToken:  savedData.props.responsibleToken,
    }).toEqual(expect.objectContaining(expectedData));
  });
  
  
  it('should throw an error if the responsible token is not valid', async () => {
    const validToken = 'yew872832heyiewehosdisodsd';
    
    responsibleRepository.items = [];

    await expect(createAnalyticsData.execute({
      device: 'desktop',
      os: 'windows',
      sourceDomainUrl: 'http://localhost:3001',
      themeChangeCount: 4,
      token: validToken
    })).rejects.toThrow('Responsible token is not valid!');
  });
});
