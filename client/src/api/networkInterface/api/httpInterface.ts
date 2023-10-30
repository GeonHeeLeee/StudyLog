import { AxiosRequestConfig } from 'axios';
import {ICommunication} from './http';


export class HttpInterface {
  private defaultOptions;
  constructor(private apiClient: ICommunication) {
    this.apiClient = apiClient;
    this.defaultOptions =  {
      headers: {
        'content-type': 'text/csv',
        //'Authorization':  
      }
    };
  }

  // TODO: Api 명세 대로 구현하기
  getPopulation() {
    const url = '';
    return this.apiClient.get(url);
  }

  getData() {
    const url = '/csv/data3.csv';
    return this.apiClient.get(url, this.defaultOptions);
  }

  get(url: string, options: AxiosRequestConfig<any> = this.defaultOptions) {
    return this.apiClient.get(url, options);
  }
}
