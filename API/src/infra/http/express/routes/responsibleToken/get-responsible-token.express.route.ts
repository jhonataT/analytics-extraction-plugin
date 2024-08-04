import { Request, Response } from "express";
import { GetResponsibleToken } from "../../../../../application/usecases/responsibleToken/get-responsible-token.usecase"; 
import { HttpMethod, Route } from "../route";

type GetResponsibleTokenResponseDto = {
  id: string;
};

export class GetResponsibleTokenRoute implements Route {
  static instance: GetResponsibleTokenRoute;
  
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getResponsibleTokenService: GetResponsibleToken,
  ) {};

  public static create(getResponsibleTokenService: GetResponsibleToken) {
    // Singleton Pattern
    if(!GetResponsibleTokenRoute.instance) {
      GetResponsibleTokenRoute.instance = new GetResponsibleTokenRoute(
        "/get-responsible-token",
        HttpMethod.GET,
        getResponsibleTokenService
      );
    }

    return GetResponsibleTokenRoute.instance;
  };

  public getHandler(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      try {
        const token: string | undefined = req.headers['authorization']?.replace('Bearer ', '');

        const ResponsibleToken: GetResponsibleTokenResponseDto = 
          await this.getResponsibleTokenService.execute({ token });

        res.status(200).json(ResponsibleToken);
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(400).json({ error: 'An unknown error occurred' });
        }
      }
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
