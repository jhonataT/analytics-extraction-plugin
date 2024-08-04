import { CreateResponse } from "../@types/response-status";
import { AnalyticsData } from "../entities/analytics-data.entity";
import { Api } from "../infra/api/api";
import { IAnalyticsDataRepository } from "./IAnalyticsDataRepository";

export class AnalyticsDataRepository implements IAnalyticsDataRepository {
  async save(analyticsData: AnalyticsData): Promise<CreateResponse> {
    try {
      const response: CreateResponse = await Api.post('collect', window.ht?.getToken(), analyticsData);
      
      return response;
    } catch(error) {
      console.log("error", error)
      return { error: 'Erro ao salvar os dados' };
    }
  }
}