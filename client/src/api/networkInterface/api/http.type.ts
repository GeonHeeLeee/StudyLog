export type SignInData = {
  userId: string;
  password: string;
};

export type JoinData = {
  userId: string;
  password: string;
  name: string;
  birth: string;
};

export type PostFeedData = {
  writerId: string;
  photo: string;
  feedBody: string;
};

export type ModifyFeedData = {
  feedId: number;
  feedBody: string;
};

export type SignOutData = {
  // userId: string;
};

export type FeedsPaginationData = {
  userId: string;
  pageNum: number | string;
};

export type FeedMetadata = {
  userId: string;
  feedId: number;
};

export type FeedOutline = {
  feedId: number; // 이부분은 확인 필요
  writerId: string;
  date: string; // 또는 Date
  likes: number;
  photo: string; // URL 형식
  feedBody: string;
  userName: string;
  comments: Comment[];
};

export type FeedsData = {
  next: string;
  feeds: FeedOutline[];
};

export type Comment = {
  userId: string;
  commentBody: string;
  feedId: number;
};

export type FeedDetail = FeedOutline & {
  comments: Comment[];
};

export type AddScheduleData = {
  userId: string;
  toDo: string;
  date: string;
};

export type ScheduleData = {
  userId: string;
  toDo: string;
  scheduleId: number;
  date: string;
  done: boolean;
};

export type Schedules = {
  status: number;
  data: {
    schedules: ScheduleData[];
  };
};

export type ProfileData = {
  userId: string;
};

export type AddTimeData = {
  userId: string;
  date: string;
  studyTime: string | number;
};

export type PostCommentData = {
  userId: string;
  feedId: number;
  commentBody: string;
};

export type FollowUsers = {
  selfId: string;
  followingId: string | undefined;
};
