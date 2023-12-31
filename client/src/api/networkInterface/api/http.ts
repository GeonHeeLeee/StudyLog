import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ICommunication {
  get(url: string, config?: any): Promise<any>;

  put(url: string, data: any, config?: AxiosRequestConfig<any>): Promise<any>;

  post(url: string, data: any, config?: AxiosRequestConfig<any>): Promise<any>;

  delete(url: string, config?: any): Promise<any>;
}

/* const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'http://34.42.1.187:8081'; */

export class Http implements ICommunication {
  httpClient: AxiosInstance;

  constructor() {
    const axiosConfig = {
      // baseURL: 'http://35.230.55.35:8081',
      baseURL:
        window.location.hostname === 'localhost'
          ? 'http://35.230.55.35:8081'
          : '/api',

      // baseURL: 'http://localhost:8081',
      //
      //
      /*  */
      // 'http://34.42.1.187:8081',
      withCredentials: true,
    };
    axios.defaults.withCredentials = true;
    this.httpClient = axios.create(axiosConfig);
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
