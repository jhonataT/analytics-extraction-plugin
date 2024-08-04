import { Api } from "./api";

jest.mock("../../config/config", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

global.fetch = jest.fn();

describe('Api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call fetch with correct parameters for GET requests', async () => {
    const mockResponse = { data: 'mockData' };
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const response = await Api.get('endpoint', 'mockToken');

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:mockendpoint',
      {
        headers: {
          "Content-type": "application/json",
          Authorization: 'Bearer mockToken',
        },
      }
    );
    expect(response).toEqual(mockResponse);
  });

  it('should call fetch with correct parameters for POST requests', async () => {
    const mockResponse = { data: 'mockData' };
    const postData = { key: 'value' };
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const response = await Api.post('endpoint', 'mockToken', postData);

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:mockendpoint',
      {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          Authorization: 'Bearer mockToken',
        },
        body: JSON.stringify(postData),
      }
    );
    expect(response).toEqual(mockResponse);
  });

  it('should call fetch without authorization headers when no token is provided', async () => {
    const mockResponse = { data: 'mockData' };
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const response = await Api.get('endpoint', '');

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:mockendpoint',
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    expect(response).toEqual(mockResponse);
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Fetch failed';
    (global.fetch as jest.Mock).mockRejectedValue(new Error(errorMessage));

    try {
      await Api.get('endpoint', 'mockToken');
    } catch (error) {
      expect(error).toEqual(new Error(errorMessage));
    }
  });
});
