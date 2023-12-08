export type Feeds = {
  feedId: number;
  feedBody: string;
  data: string;
  likes: number;
  photo: string;
  comments: string[];
};

export type Timers = {
  date: string;
  id: number;
  state: number;
  studyTime: number;
  userId: string;
};

export type User = {
  userId: string;
  profilePhrase: null | string;
  profilePhoto: string;
  name: string;
  followingCount: number;
  followerCount: number;
  birth: number;
};
