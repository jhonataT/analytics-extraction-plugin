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
      const response = await Api.get('get-responsible-token', this.getToken());
      
      if(!response?.id) {
        throw new Error('Token is not valid!');
      }
      
      this.isValidToken = true;
    } catch(error) {
      this.isValidToken = false;
    }
  }
};

(window as any).HT_TOKEN = HT_TOKEN;
