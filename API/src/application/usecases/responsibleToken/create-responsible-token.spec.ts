import { CreateResponsibleToken } from "./create-responsible-token.usecase";

describe('Create responsible token use case', () => {
  it('Should be able to create a new responsible token', async () => {
    const systemUndertest = new CreateResponsibleToken();

    const response = await systemUndertest.execute({
      lastExtractionsCount: 5,
      token: 'yew872832heyiewehosdisodsd',
    });

    expect(response).toBeTruthy();
  });
});