import { AnalyticsDataRepository } from "./analytics-data-repository";
import { FirebaseAnalyticsDataRepository } from "../../infra/firebase/repositories/firebase-analytics-data.repository";
import { AnalyticsData } from "../../domain/entities/analytics-data.entity";

jest.mock("../../infra/firebase/repositories/firebase-analytics-data.repository", () => {
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

describe('AnalyticsDataRepository', () => {
  let repository: AnalyticsDataRepository;
  let firebaseRepository: jest.Mocked<FirebaseAnalyticsDataRepository>;

  beforeEach(() => {
    firebaseRepository = FirebaseAnalyticsDataRepository.init() as jest.Mocked<FirebaseAnalyticsDataRepository>;
    repository = AnalyticsDataRepository.init(firebaseRepository);
  });

  it('should save data using FirebaseAnalyticsDataRepository', async () => {
    const data = await AnalyticsData.create({
      device: 'iPhone',
      os: 'iOS 15',
      sourceDomainUrl: 'https://example.com',
      themeChangeCount: 5,
      responsibleToken: 'token123',
    }, 'test-id');

    firebaseRepository.save.mockResolvedValue(data);

    const result = await repository.save(data);

    expect(result).toBe(data);
    expect(firebaseRepository.save).toHaveBeenCalledWith(data);
  });

  it('should find data by id using FirebaseAnalyticsDataRepository', async () => {
    const data = await AnalyticsData.create({
      device: 'iPhone',
      os: 'iOS 15',
      sourceDomainUrl: 'https://example.com',
      themeChangeCount: 5,
      responsibleToken: 'token123',
    }, 'test-id');

    firebaseRepository.findById.mockResolvedValue([data]);

    const result = await repository.findById('test-id');

    expect(result).toStrictEqual([data]);
    expect(firebaseRepository.findById).toHaveBeenCalledWith('test-id');
  });

  it('should find all data using FirebaseAnalyticsDataRepository', async () => {
    const dataList = [
      await AnalyticsData.create({
        device: 'iPhone',
        os: 'iOS 15',
        sourceDomainUrl: 'https://example.com',
        themeChangeCount: 5,
        responsibleToken: 'token123',
      }, 'test-id-1'),
      await AnalyticsData.create({
        device: 'Android',
        os: 'Android 12',
        sourceDomainUrl: 'https://example.org',
        themeChangeCount: 3,
        responsibleToken: 'token456',
      }, 'test-id-2')
    ];

    firebaseRepository.findAll.mockResolvedValue(dataList);

    const result = await repository.findAll();

    expect(result).toEqual(dataList);
    expect(firebaseRepository.findAll).toHaveBeenCalled();
  });
});
