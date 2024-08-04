import { db } from '../config.firebase';
import { AnalyticsData } from '../../../domain/entities/analytics-data.entity';
import { IAnalyticsDataRepository } from '../../../application/repositories/IAnalyticsDataRepository';

export class FirebaseAnalyticsDataRepository implements IAnalyticsDataRepository {
  static instance: FirebaseAnalyticsDataRepository;
  private dbRef = db.ref('analyticsData');

  private constructor() {};

  static init() {
    // Singleton Pattern
    if(!FirebaseAnalyticsDataRepository.instance) {
      FirebaseAnalyticsDataRepository.instance = new FirebaseAnalyticsDataRepository();
    };

    return FirebaseAnalyticsDataRepository.instance;
  };

  async save(analyticsData: AnalyticsData): Promise<AnalyticsData> {
    const newAnalyticsRef = this.dbRef.push();
    await newAnalyticsRef.set(analyticsData.toJSON());

    return AnalyticsData.fromJSON({
      ...analyticsData.toJSON(),
      refId: newAnalyticsRef.key as string
    });
  }

  async findById(id: string): Promise<AnalyticsData[]> {
    const tokensRef = this.dbRef;
    
    const snapshot = await tokensRef.orderByChild('responsibleToken').equalTo(id).limitToLast(20).once('value');
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const analyticsDataList: AnalyticsData[] = [];
      Object.keys(data).forEach((key) => {
        analyticsDataList.push(AnalyticsData.fromJSON(data[key]));
      });
      return analyticsDataList;
    };
  
    return [];
  }

  async findAll(): Promise<AnalyticsData[]> {
    const snapshot = await this.dbRef.once('value');

    if (!snapshot.exists())
      return [];

    const analyticsDataList: AnalyticsData[] = [];
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const analyticsData = AnalyticsData.fromJSON({ ...data, id: childSnapshot.key });
      analyticsDataList.push(analyticsData);
    });

    return analyticsDataList;
  }
}
