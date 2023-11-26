// export type ProfileResult = {
//   [key: string]: any;
// };

export type ProfileResult = {
  username: string;
  userid: string;
  bio: string;
  followers: number;
  following: number;
  feeds: Feed[];
};

export type Feed = {
  content: string;
  imgUrl: string;
  comments: number;
  likes: number;
};
