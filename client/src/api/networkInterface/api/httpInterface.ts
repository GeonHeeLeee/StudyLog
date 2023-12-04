import { AxiosRequestConfig } from 'axios';
import { ICommunication } from './http';
import {
  AddScheduleData,
  FeedMetadata,
  FeedsData,
  FeedsPaginationData,
  JoinData,
  ScheduleData,
  SignInData,
  SignOutData,
} from './http.type';

export class HttpInterface {
  private defaultOptions;
  constructor(private apiClient: ICommunication) {
    this.apiClient = apiClient; // axios
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
  checkDuplicateId(userId: string) {
    const url = `/join/checkId?userId=${userId}`;
    return this.get(url);
  }

  getFeeds(paginationData: FeedsPaginationData): Promise<FeedsData> {
    const url = `/home?userId=${paginationData.userId}&page=${paginationData.pageNum}`;
    return this.get(url);
  }

  getFeedById(feedMetadata: FeedMetadata) {
    const url = `/feed?userId=${feedMetadata.userId}&feedId=${feedMetadata.feedId}`;
    return this.get(url);
  }

  // TODO: API 명세 나오는 대로 구현
  addSchedule(scheduleData: AddScheduleData) {
    const url = `/schedule`;
    return this.post(url, scheduleData);
  }

  getScheduleByDate(userId: string, dateString: string): Promise<ScheduleData> {
    const url = `/schedule?userId=${userId}&date=${dateString}`;
    return this.get(url);
  }
  finishSchedule(scheduleId: string) {
    const url = `/schedule/done`;
    return this.post(url, { scheduleId });
  }

  get(url: string, options: AxiosRequestConfig<any> = this.defaultOptions) {
    return this.apiClient.get(url, options);
  }

  post<T>(url: string, data: T, options?: AxiosRequestConfig<any>) {
    return this.apiClient.post(url, data);
  }
}
