import { IResponsibleTokenRepository } from "../../repositories/IResponsibleTokenRepository";

type GetResponsibleTokenRequest = {
  token: string | undefined;
};

type GetResponsibleTokenResponse = {
  id: string;
};

export class GetResponsibleToken {
  constructor(
    private ResponsibleTokenRepository: IResponsibleTokenRepository
  ) {}

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

    throw new Error('Token not found!');
  }
}
