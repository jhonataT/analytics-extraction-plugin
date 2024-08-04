import { Api } from "../api";
import { HT_TOKEN } from "./token-validate.repository";

jest.mock("../../../config/config", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

jest.mock('../api', () => ({
  Api: {
    get: jest.fn(),
  },
}));

describe('HT_TOKEN', () => {
  let htToken: HT_TOKEN;
  const mockToken = 'mockToken';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a singleton instance', () => {
    const instance1 = HT_TOKEN.init({ token: mockToken });
    const instance2 = HT_TOKEN.init({ token: 'anotherToken' });

    expect(instance1).toBe(instance2);
    expect(instance1.getToken()).toBe(mockToken);
  });
  
  it('should return invalidated token status', async () => {
    const invalidResponse = { error: 'Invalid Token' };
    jest.spyOn(Api, 'get').mockResolvedValue(invalidResponse);

    htToken = HT_TOKEN.init({ token: mockToken });

    await new Promise((r) => setTimeout(r, 100));

    expect(htToken.getToken()).toBe(mockToken);
    expect(htToken.getIsValidToken()).toBe(false);
  });
});
