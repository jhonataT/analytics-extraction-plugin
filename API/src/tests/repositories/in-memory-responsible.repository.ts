import { IResponsibleTokenRepository } from "../../application/repositories/IResponsibleTokenRepository"; 
import { ResponsibleToken } from "../../domain/entities/responsible-token.entity";

export class InMemoryResponsibleRepository implements IResponsibleTokenRepository {
  public items: ResponsibleToken[] = [];

  async save(responsibleToken: ResponsibleToken): Promise<ResponsibleToken> {
    this.items.push(responsibleToken);

    const responsibleTokenResponse = 
      await this.getResponsibleToken(responsibleToken.props.token);
    
    return responsibleTokenResponse as ResponsibleToken;
  }
  
  async getResponsibleToken(token: string): Promise<ResponsibleToken | null> {
    const responsible = this.items.find(responsible => responsible.props.token === token);

    return responsible || null;
  };
};