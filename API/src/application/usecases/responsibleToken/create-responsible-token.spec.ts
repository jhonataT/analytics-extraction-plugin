import { CreateResponsibleToken } from "./create-responsible-token.usecase";
import { ResponsibleToken } from "../../../domain/entities/responsible-token.entity";
import { IResponsibleTokenRepository } from "../../repositories/IResponsibleTokenRepository";

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

describe('CreateResponsibleToken use case', () => {
  let createResponsibleToken: CreateResponsibleToken;
  let responsibleTokenRepository: jest.Mocked<IResponsibleTokenRepository>;

  beforeEach(() => {
    responsibleTokenRepository = {
      save: jest.fn(),
      getResponsibleToken: jest.fn()
    } as jest.Mocked<IResponsibleTokenRepository>;

    createResponsibleToken = CreateResponsibleToken.init(responsibleTokenRepository);
  });

  it('should be able to create a new responsible token', async () => {
    const domain = 'example.com';
    const email = 'user@example.com';

    const responsibleToken = ResponsibleToken.create({ domain, email });

    responsibleTokenRepository.save.mockResolvedValue(responsibleToken);

    const response = await createResponsibleToken.execute({
      domain,
      email
    });

    expect(response).toEqual({
      token: responsibleToken.props.token,
      domain: responsibleToken.props.domain
    });

    // expect(responsibleTokenRepository.save).toHaveBeenCalledWith(responsibleToken);

    const [savedData] = responsibleTokenRepository.save.mock.calls[0];
    expect({
      domain: savedData.props.domain,
      email: savedData.props.email
    }).toEqual(expect.objectContaining({
      domain: responsibleToken.props.domain,
      email:  responsibleToken.props.email
    }));
  });
});
