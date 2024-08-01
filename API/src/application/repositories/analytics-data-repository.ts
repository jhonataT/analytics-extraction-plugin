import { IAnalyticsDataRepository } from "./IAnalyticsDataRepository";
import { AnalyticsData } from "../../domain/entities/analytics-data.entity";
import { FirebaseAnalyticsDataRepository } from "../../infra/firebase/repositories/firebase-analytics-data.repository";

export class AnalyticsDataRepository implements IAnalyticsDataRepository {
  constructor(
    private firebaseRepository: FirebaseAnalyticsDataRepository,
  ) {};

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
