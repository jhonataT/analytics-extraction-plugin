import { ResponsibleToken } from "../../domain/entities/responsible-token.entity";

export interface IResponsibleTokenRepository {
  save(responsibleToken: ResponsibleToken): Promise<ResponsibleToken>;
  getResponsibleToken(token: string): Promise<ResponsibleToken | null>;
};