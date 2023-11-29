import { AxiosRequestConfig } from 'axios';
import { ICommunication } from './http';
import {
  FeedMetadata,
  FeedsData,
  FeedsPaginationData,
  JoinData,
  SignInData,
  SignOutData,
} from './http.type';

export class HttpInterface {
  private defaultOptions;
  constructor(private apiClient: ICommunication) {
    this.apiClient = apiClient;
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  // TODO: Api 명세 대로 구현하기
  login(signInData: SignInData) {
    const url = '/login';
    return this.post(url, signInData);
  }

  logout(signOutData: SignOutData) {
    const url = '/logout';
    return this.post(url, signOutData);
  }

  join(joinData: JoinData) {
    const url = '/join';
    return this.post(url, joinData);
  }

  getFeeds(paginationData: FeedsPaginationData): Promise<FeedsData> {
    const url = `/home?userId=${paginationData.userId}&page=${paginationData.pageNum}`;
    return this.get(url);
  }

  getFeedById(feedMetadata: FeedMetadata) {
    const url = `/feed?userId=${feedMetadata.userId}&feedId=${feedMetadata.feedId}`;
    return this.get(url);
  }

  get(url: string, options: AxiosRequestConfig<any> = this.defaultOptions) {
    return this.apiClient.get(url, options);
  }

  post<T>(url: string, data: T, options?: AxiosRequestConfig<any>) {
    return this.apiClient.post(url, data);
  }
}
