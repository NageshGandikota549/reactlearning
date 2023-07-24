type RequestModel = {
  method: string;
  url: string;
  data: any[];
  headers?: any;
};

class httpMock {
  _mocks: RequestModel[] = [];

  constructor() {
    (window as Window).fetch = (
      url: RequestInfo | URL,
      request?: RequestInit | undefined
    ): Promise<Response> => {
      const method = request?.method ?? "GET";

      const mock = this._mocks.find(
        (x) => x.method === method && url.toString().includes(x.url)
      );

      if (mock)
        return new Promise((resolve) =>
          resolve(
            new Response(JSON.stringify(mock.data), { headers: mock.headers })
          )
        );

      return new Promise((resolve) => resolve(new Response()));
    };
  }

  clearMocks(): void {
    this._mocks = [];
  }

  mockGet(url: string, data: any[] | any, headers?: any): void {
    headers = headers || { "Content-Type": "application/json" };

    this._mocks.push({ method: "GET", url, data, headers });
  }

  mockPost(url: string, data: any[] | any, headers?: any): void {
    headers = headers || { "Content-Type": "application/json" };

    this._mocks.push({ method: "POST", url, data, headers });
  }

  mockPut(url: string, data: any[] | any, headers?: any): void {
    headers = headers || { "Content-Type": "application/json" };

    this._mocks.push({ method: "PUT", url, data, headers });
  }
}

const mock = new httpMock();

export default mock;
