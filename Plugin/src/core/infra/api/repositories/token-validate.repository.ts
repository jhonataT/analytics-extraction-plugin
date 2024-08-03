import { Api } from "../api";

interface HTOptions {
  token: string;
};

export class HT_TOKEN {
  private token: string;
  private isValidToken: boolean = false;

  constructor(options: HTOptions) {
    this.token = options.token;
    this.tokenValidation();
  };

  getToken(): string {
    return this.token;
  }

  getIsValidToken(): boolean {
    return this.isValidToken;
  }
 
  private async tokenValidation() {
    try {
      this.isValidToken = await Api.get('/auth', this.getToken());
    } catch(error) {
      this.isValidToken = false;
    }

    console.log("TOKEN RECEBIDO ", {token: this.token, isValidToken: this.isValidToken});
  }
};

(window as any).HT_TOKEN = HT_TOKEN;
