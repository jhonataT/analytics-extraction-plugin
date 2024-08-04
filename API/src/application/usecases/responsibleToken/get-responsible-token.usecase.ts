import { IResponsibleTokenRepository } from "../../repositories/IResponsibleTokenRepository";

type GetResponsibleTokenRequest = {
  token: string | undefined;
};

type GetResponsibleTokenResponse = {
  id: string;
};

export class GetResponsibleToken {
  static instance: GetResponsibleToken;
  
  private constructor(
    private ResponsibleTokenRepository: IResponsibleTokenRepository
  ) {};

  static init(responsibleTokenRepository: IResponsibleTokenRepository) {
    // Singleton Pattern
    if(!GetResponsibleToken.instance) {
      GetResponsibleToken.instance = new GetResponsibleToken(responsibleTokenRepository);
    };

    return GetResponsibleToken.instance;
  };

  async execute({
    token
  }: GetResponsibleTokenRequest): Promise<GetResponsibleTokenResponse> {
    if (token) {
      const responsibleToken = await this.ResponsibleTokenRepository.getResponsibleToken(token);

      if (!responsibleToken) {
        throw new Error('ResponsibleToken not found!');
      }

      return { id: responsibleToken.id };
    }

    throw new Error('Token or domain not found!');
  }
}
