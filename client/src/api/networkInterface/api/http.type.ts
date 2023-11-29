export type SignInData = {
  userId: string;
  password: string;
};

export type JoinData = {
  userId: string;
  password: string;
  name: string;
  phoneNumber: string;
  email: `${string}@${string}`;
  birth: string;
};

export type SignOutData = {
  userId: string;
};

export type FeedsPaginationData = {
  userId: string;
  pageNum: number;
};

export type FeedMetadata = {
  userId: string;
  feedId: string | number;
};

export type FeedOutline = {
  feedId: number | string; // 이부분은 확인 필요
  writerId: string;
  date: string; // 또는 Date
  likes: number;
  photo: string; // URL 형식
};

export type FeedsData = {
  next: string;
  feeds: FeedOutline[];
};

export type Comment = {
  userId: string;
  commentBody: string;
};

export type FeedDetail = FeedOutline & {
  comments: Comment[];
};

export type ScheduleData = {
  userId: string;
  toDo: string;
};

export type ScheduleTimeData = {
  userId: string;
  toDo: string;
  startTime: Date;
  endTime: Date;
};
