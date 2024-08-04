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
  constructor(
    private responsibleTokenRepository: IResponsibleTokenRepository,
  ) {}

  async execute({ domain, email }: CreateResponsibleTokenRequest): Promise<CreateResponsibleTokenResponse> {
    
    const createResponsible = ResponsibleToken.create({ domain, email });

    const savedResponsible = await this.responsibleTokenRepository.save(createResponsible);

    return { 
      token: savedResponsible.props.token,
      domain: savedResponsible.props.domain
    };
  };
};