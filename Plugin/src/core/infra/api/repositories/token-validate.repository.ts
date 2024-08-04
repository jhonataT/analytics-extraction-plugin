import { Api } from "../api";

interface HTOptions {
  token: string;
};

export class HT_TOKEN {
  static instance: HT_TOKEN;
  private token: string;
  private isValidToken: boolean = false;

  private constructor(options: HTOptions) {
    this.token = options.token;
    this.tokenValidation();
  };

  static init(options: HTOptions) {
    if(!HT_TOKEN.instance) {
      HT_TOKEN.instance = new HT_TOKEN(options);
    };

    return HT_TOKEN.instance;
  };

  getToken(): string {
    return this.token;
  };

  getIsValidToken(): boolean {
    return this.isValidToken;
  };
 
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
  };
};

(window as any).HT_TOKEN = HT_TOKEN;
