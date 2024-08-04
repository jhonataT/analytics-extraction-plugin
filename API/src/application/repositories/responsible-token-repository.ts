import { ResponsibleToken } from "../../domain/entities/responsible-token.entity";
import { FirebaseResponsibleTokenRepository } from "../../infra/firebase/repositories/firebase-responsible-token.repository";
import { IResponsibleTokenRepository } from "./IResponsibleTokenRepository";

export class ResponsibleTokenRepository implements IResponsibleTokenRepository {
  static instance: ResponsibleTokenRepository;
  
  private constructor(
    private firebaseRepository: FirebaseResponsibleTokenRepository
  ) {};

  static init(firebaseResponsibleTokenRepository: FirebaseResponsibleTokenRepository) {
    // Singleton Pattern
    if(!ResponsibleTokenRepository.instance) {
      ResponsibleTokenRepository.instance = new ResponsibleTokenRepository(firebaseResponsibleTokenRepository);
    };

    return ResponsibleTokenRepository.instance;
  };

  async save(resposibleTokenBody: ResponsibleToken): Promise<ResponsibleToken> {
    return await this.firebaseRepository.save(resposibleTokenBody);
  };
  
  async getResponsibleToken(token: string): Promise<ResponsibleToken | null> {
    return await this.firebaseRepository.getResponsibleToken(token);
  };
}
