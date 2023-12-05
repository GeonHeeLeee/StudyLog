import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ICommunication {
  get(url: string, config?: any): Promise<any>;

  put(url: string, data: any, config?: AxiosRequestConfig<any>): Promise<any>;

  post(url: string, data: any, config?: AxiosRequestConfig<any>): Promise<any>;

  delete(url: string, config?: any): Promise<any>;
}

const baseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';
export class Http implements ICommunication {
  httpClient: AxiosInstance;

  constructor(baseURL = baseUrl) {
    const axiosConfig = {
      baseURL,
      withCredentials: true,
    };
    this.httpClient = axios.create(axiosConfig);
    // this.httpClient.defaults.headers['Access-Control-Allow-Origin'] = '*';
    // this.httpClient.defaults.withCredentials = false;
  }

  async get(url: string, config?: AxiosRequestConfig<any>) {
    return this.httpClient.get(url, {
      ...config,
    });
  }

  async post(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return this.httpClient.post(url, data, {
      ...config,
    });
  }

  async put(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return this.httpClient.put(url, data, {
      ...config,
    });
  }

  async delete(url: string, config?: AxiosRequestConfig<any>) {
    return this.httpClient.delete(url, {
      ...config,
    });
  }
}
