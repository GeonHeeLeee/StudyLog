import { AxiosRequestConfig } from 'axios';
import { ICommunication } from './http';
import { SignInData } from './http.type';

export class HttpInterface {
  private defaultOptions;
  constructor(private apiClient: ICommunication) {
    this.apiClient = apiClient;
    this.defaultOptions = {
      headers: {
        "Content-Type": 'application/json'
      },
    };
  }

  // TODO: Api 명세 대로 구현하기
  signIn(signInData: SignInData) {
    const url = '/signIn';
    return this.post(url, signInData);
  }

  get(url: string, options: AxiosRequestConfig<any> = this.defaultOptions) {
    return this.apiClient.get(url, options);
  }

  post<T>(url: string, data: T, options?: AxiosRequestConfig<any>) {
    return this.apiClient.post(url, data);
  }
}
