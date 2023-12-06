export interface FeedResponseData {
  data: FeedData;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: Request;
}

export interface FeedData {
  feedId: number;
  writerId: string;
  date: string;
  feedBody: string;
  photo: string;
  comments: Comment[];
  likes: number;
  userName: string;
}

export interface Comment {
  userId: string;
  feedId: number;
  commentBody: string;
}

export interface Headers {
  'content-type': string;
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: Headers2;
  baseURL: string;
  withCredentials: boolean;
  method: string;
  url: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Env {}

export interface Headers2 {
  Accept: string;
}

export interface Request {}
