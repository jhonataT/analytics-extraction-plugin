import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CreateResponsibleToken } from "../../../../../application/usecases/responsibleToken/create-responsible-token.usecase";

type CreateCollectRequestDto = {
  domain: string;
  email?: string;
};

export type CreateTokenResponseDto = {
  token?: string;
  domain: string;
};

export class CreateResponsibleTokenRoute implements Route {
  static instance: CreateResponsibleTokenRoute;
  
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createResponsibleTokenService: CreateResponsibleToken,
  ) {};

  public static create(createResponsibleTokenService: CreateResponsibleToken) {
    // Singleton Pattern
    if(!CreateResponsibleTokenRoute.instance) {
      CreateResponsibleTokenRoute.instance = new CreateResponsibleTokenRoute(
        "/generate-responsible-token",
        HttpMethod.POST,
        createResponsibleTokenService
      );
    }

    return CreateResponsibleTokenRoute.instance;
  };

  public getHandler(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      try {
        const body: CreateCollectRequestDto = req.body;
        const responsibleToken: CreateTokenResponseDto = await this.createResponsibleTokenService.execute(body);
        const responseBody = responsibleToken;

        res.status(201).json(responseBody);
      } catch (error) {
        if (error instanceof Error)
          res.status(400).json({ error: error.message });
        else
          res.status(400).json({ error: 'An unknown error occurred' });
      }
    };
  };

  public getPath(): string {
    return this.path;
  };

  public getMethod(): HttpMethod {
    return this.method;
  };
};
