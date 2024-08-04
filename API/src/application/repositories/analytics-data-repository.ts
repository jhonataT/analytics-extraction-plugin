import { IAnalyticsDataRepository } from "./IAnalyticsDataRepository";
import { AnalyticsData } from "../../domain/entities/analytics-data.entity";
import { FirebaseAnalyticsDataRepository } from "../../infra/firebase/repositories/firebase-analytics-data.repository";

export class AnalyticsDataRepository implements IAnalyticsDataRepository {
  static instance: AnalyticsDataRepository;
  
  private constructor(
    private firebaseRepository: FirebaseAnalyticsDataRepository,
  ) {};

  static init(firebaseAnalyticsDataRepository: FirebaseAnalyticsDataRepository) {
    // Singleton Pattern
    if(!AnalyticsDataRepository.instance) {
      AnalyticsDataRepository.instance = new AnalyticsDataRepository(firebaseAnalyticsDataRepository);
    };

    return AnalyticsDataRepository.instance;
  };

  async save(data: AnalyticsData): Promise<AnalyticsData> {
    const analyticData = await this.firebaseRepository.save(data);

    return analyticData;
  }

  async findById(id: string): Promise<AnalyticsData | null> {
    return await this.firebaseRepository.findById(id);
  }

  async findAll(): Promise<AnalyticsData[]> {
    return await this.firebaseRepository.findAll();
  }
}
