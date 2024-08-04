import { config } from "../../config/config";
const { apiUrl } = config;

export class Api {
  private static serverUrl = apiUrl;
  
  private static getHeaders(token?: string): HeadersInit {
    if(token) {
      return {
        "Content-type": "application/json",
        Authorization: `Bearer ${token as string}`,
      };
    }

    return { "Content-type": "application/json" };
  }

  static async get(endpoint: string, token: string) {
    return fetch(`${this.serverUrl}${endpoint}`, {
      headers: this.getHeaders(token),
    }).then(res => res.json());
  }

  static async post(endpoint: string, token: string, data: object) {
    return fetch(`${this.serverUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(data)
    }).then(res => res.json());
  }
};
