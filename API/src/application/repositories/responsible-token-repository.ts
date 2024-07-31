import { Responsible } from "../../domain/entities/responsible.entity";

export interface ResponsibleTokenRepository {
  getResponsibleToken(token: string): Promise<Responsible | null>;
};