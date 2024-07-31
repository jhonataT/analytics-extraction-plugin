import { ResponsibleTokenRepository } from "../../application/repositories/responsible-token-repository";
import { Responsible } from "../../domain/entities/responsible.entity";

export class InMemoryResponsibleRepository implements ResponsibleTokenRepository {
  public items: Responsible[] = [];
  
  async getResponsibleToken(token: string): Promise<Responsible | null> {
    const responsible = this.items.find(responsible => responsible.props.token === token);

    return responsible || null;
  };
};