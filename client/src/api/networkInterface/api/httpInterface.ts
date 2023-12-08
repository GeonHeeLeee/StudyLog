import axios, { AxiosRequestConfig } from 'axios';
import { ICommunication } from './http';
import {
  AddScheduleData,
  AddTimeData,
  FeedMetadata,
  FeedsData,
  FeedsPaginationData,
  FollowUsers,
  JoinData,
  ModifyFeedData,
  PostCommentData,
  PostFeedData,
  Schedules,
  SignInData,
  SignOutData,
  EditProfileData,
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

  logout() {
    const url = '/logout';
    return this.post(url, {});
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

  postFeed(feedData: PostFeedData) {
    const url = `/feed`;
    return this.post(url, feedData);
  }

  likeFeed(feedId: number) {
    const url = `/feed/like`;
    return this.post(url, {
      feedId,
    });
  }

  postCommentInFeed(comment: PostCommentData) {
    console.log(comment);

    const url = `/feed/comment`;
    return this.post(url, comment);
  }

  modifyFeed(feedData: ModifyFeedData) {
    const url = `/feed/modify`;
    return this.post(url, feedData);
  }

  // TODO: API 명세 나오는 대로 구현
  addSchedule(scheduleData: AddScheduleData) {
    const url = `/schedule`;
    return this.post(url, scheduleData);
  }

  getScheduleByDate(userId: string, dateString: string): Promise<Schedules> {
    const url = `/schedule?userId=${userId}&date=${dateString}`;
    return this.get(url);
  }
  toggleScheduleDone(scheduleId: number) {
    const url = `/schedule/done`;
    return this.post(url, { scheduleId });
  }

  addStudyTime(addTimeData: AddTimeData) {
    const url = `/timer`;
    return this.post(url, addTimeData);
  }

  uploadImage(imageFile: FormData) {
    const CLOUDINARY_NAME = 'dgtozy2lj';
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;
    const res = axios.post(url, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res;
  }

  // 유저 개인 프로필 정보 가져오기
  getUsersProfile(userId: string | undefined, followingId: string | undefined) {
    const url = `/profile?userId=${userId}&followingId=${followingId}`;
    return this.get(url);
  }

  searchUsers(userId: string | undefined) {
    const url = `/profile/search`;
    return this.post(url, { userId });
  }

  follow(followUsers: FollowUsers) {
    const url = `/follow`;
    return this.post(url, followUsers);
  }

  unFollow(unFollowUsers: FollowUsers) {
    const url = `/unfollow`;
    return this.post(url, unFollowUsers);
  }

  // TODO: 이미지 처리 하는대로 구현
  editProfile(profileData: EditProfileData) {
    const url = `/profile/edit`;
    return this.post(url, profileData);
  }

  get(url: string, options: AxiosRequestConfig<any> = this.defaultOptions) {
    return this.apiClient.get(url, options);
  }

  post<T>(url: string, data: T, options?: AxiosRequestConfig<any>) {
    return this.apiClient.post(url, data);
  }
}
