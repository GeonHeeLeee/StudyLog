import React from 'react';
import styles from './profile.module.css';
import { ProfileResult } from './ProfileResult';
import Image from '../../components/Image/Image';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';

type Props = {
  profile: ProfileResult; // 프로필 정보를 담은 객체
};

type Feed = {
  content: string;
  imgUrl: string;
  comments: number;
  likes: number;
};

export default function ProfileContainer() {
  const profile: ProfileResult = {
    username: '이석희',
    userid: '@devLee',
    bio: '안녕하세요. 이석희입니다.',
    followers: 10,
    following: 20,
    feeds: [
      {
        content: '문단...',
        imgUrl: '/img.jpg',
        comments: 6,
        likes: 16,
      },
      {
        content: '문단...',
        imgUrl: '/img.jpg',
        comments: 6,
        likes: 16,
      },
      {
        content: '문단...',
        imgUrl: '/img.jpg',
        comments: 6,
        likes: 16,
      },
      {
        content: '문단...',
        imgUrl: '/img.jpg',
        comments: 6,
        likes: 16,
      },
      {
        content: '문단...',
        imgUrl: '/img.jpg',
        comments: 6,
        likes: 16,
      },
    ],
  };

  return (
    <article className={styles['profile-article']}>
      <div className={styles['profile-icon']}>
        {/*<a>Profile 아이콘</a>*/}
        <div></div>
      </div>
      <main className={styles['profile-main']}>
        <div className={styles['profile-userinfo']}>
          <span className={styles['username']}>{profile.username}</span>
          <span className={styles['userid']}>{profile.userid}</span>
        </div>
        <div className={styles['profile-meta']}>
          <div className={styles['profile-followers']}>
            <span>팔로워</span>
            <span>{profile.followers}</span>
          </div>
          <div className={styles['profile-following']}>
            <span>팔로잉</span>
            <span>{profile.following}</span>
          </div>
        </div>
        <div className={styles['profile-bio']}>
          <p>{profile.bio}</p>
        </div>
        <div className={styles['profile-contents']}>
          {profile.feeds.map((feed) => (
            <div className={styles['feed-content']}>
              <p>{feed.content}</p>
              <div>
                <Image
                  src={feed.imgUrl}
                  alt={''}
                  className={styles['feed-image']}
                />{' '}
                <div className={styles['feed-meta']}>
                  <span>
                    <FaCommentAlt /> {feed.comments}
                  </span>
                  <span>
                    <FaThumbsUp /> {feed.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </article>
  );
}
