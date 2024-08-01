import { Responsible } from "../../../domain/entities/responsible-token.entity";
import { ResponsibleTokenRepository } from "../../repositories/responsible-token-repository";

type CreateResponsibleTokenRequest = {
  token: string;
  email?: string;
  lastExtractionsCount: number
};

export class CreateResponsibleToken {
  async execute({ lastExtractionsCount, token, email }: CreateResponsibleTokenRequest) {
    const responsible = Responsible.create({
      lastExtractionsCount,
      token,
      email
    });

    return responsible;
  };
};