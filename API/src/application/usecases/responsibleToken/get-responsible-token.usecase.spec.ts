import { GetResponsibleToken } from "./get-responsible-token.usecase";
import { IResponsibleTokenRepository } from "../../repositories/IResponsibleTokenRepository";
import { ResponsibleToken } from "../../../domain/entities/responsible-token.entity";

jest.mock("../../repositories/IResponsibleTokenRepository", () => {
  return {
    FirebaseAnalyticsDataRepository: {
      init: jest.fn().mockReturnValue({
        save: jest.fn(),
        getResponsibleToken: jest.fn()
      })
    }
  }
});

describe('GetResponsibleToken use case', () => {
  let getResponsibleToken: GetResponsibleToken;
  let responsibleTokenRepository: jest.Mocked<IResponsibleTokenRepository>;

  beforeEach(() => {
    responsibleTokenRepository = {
      save: jest.fn(),
      getResponsibleToken: jest.fn()
    } as jest.Mocked<IResponsibleTokenRepository>;

    getResponsibleToken = GetResponsibleToken.init(responsibleTokenRepository);
  });

  it('should return the responsible token id when the token is valid', async () => {
    const token = 'valid-token';
    const responsibleToken = await ResponsibleToken.create({
      domain: 'example.com',
      email: 'user@example.com'
    });

    responsibleTokenRepository.getResponsibleToken.mockResolvedValue(responsibleToken);

    const response = await getResponsibleToken.execute({ token });

    expect(response).toEqual({ id: responsibleToken.id });
    expect(responsibleTokenRepository.getResponsibleToken).toHaveBeenCalledWith(token);
  });

  it('should throw an error if the token is not provided', async () => {
    await expect(getResponsibleToken.execute({ token: undefined as unknown as string }))
      .rejects
      .toThrow('Token or domain not found!');
  });
});
