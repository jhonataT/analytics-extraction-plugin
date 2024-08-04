import { ResponsibleToken } from "../../../domain/entities/responsible-token.entity";
import { IResponsibleTokenRepository } from "../../repositories/IResponsibleTokenRepository";

type CreateResponsibleTokenRequest = {
  email?: string;
  domain: string;
};

type CreateResponsibleTokenResponse = {
  token?: string;
  domain: string;
};

export class CreateResponsibleToken {
  static instance: CreateResponsibleToken;
  
  private constructor(
    private responsibleTokenRepository: IResponsibleTokenRepository,
  ) {};

  static init(responsibleTokenRepository: IResponsibleTokenRepository) {
    // Singleton Pattern
    if(!CreateResponsibleToken.instance) {
      CreateResponsibleToken.instance = new CreateResponsibleToken(responsibleTokenRepository);
    };

    return CreateResponsibleToken.instance;
  };

  async execute({ domain, email }: CreateResponsibleTokenRequest): Promise<CreateResponsibleTokenResponse> {
    
    const createResponsible = ResponsibleToken.create({ domain, email });

    const savedResponsible = await this.responsibleTokenRepository.save(createResponsible);

    return { 
      token: savedResponsible.props.token,
      domain: savedResponsible.props.domain
    };
  };
};