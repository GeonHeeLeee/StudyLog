import React, { useCallback, useEffect, useState } from 'react';
import styles from './profile.module.css';
import Image from '../../components/Image/Image';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import useLoginState from '../../stores/login';
import Button from '../../components/Button/Button.component';
import StudyLog from './StudyLog/StudyLog';

import { Feeds, Timers, User } from './profile.type';

import useNetwork from '../../stores/network';
import ModalPortal from '../../components/Portal/ModalPortal.component';
import ModalWrapper from '../../components/Modal/ModalWrapper.component';
import EditProfile from '../../components/Modal/EditProfile.component';

export default function ProfileContainer() {
  const { userId } = useParams();

  const { userInfo } = useLoginState();

  const { httpInterface } = useNetwork();
  const navigate = useNavigate();

  const [follow, setFollow] = useState<boolean>(false);
  const [feeds, setFeeds] = useState<Feeds[]>([]);
  const [timers, setTimers] = useState<Timers[]>([]);
  const [user, setUser] = useState<User>();
  const [followingState, setFollowingState] = useState<boolean>(false);
  const [showModal, toggleShowModal] = useState<boolean>(false);

  const userProfile = useCallback(
    async (userId: string) => {
      return httpInterface.getUsersProfile(userInfo.userId, userId);
    },
    [userId]
  );

  const checkMyProfile = () => {
    return userId === userInfo?.userId;
  };

  const onFollow = () => {
    const selfId = userInfo.userId;
    const followingId = userId;

    httpInterface
      .follow({ selfId, followingId })
      .then((res) => {
        console.log(res);
        res.status === 200 && setFollow(!follow);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUnfollow = () => {
    const selfId = userInfo.userId;
    const followingId = userId;

    httpInterface
      .unFollow({ selfId, followingId })
      .then((res) => {
        console.log(res);
        res.status === 200 && setFollow(!follow);
      })
      .catch((err) => {
        console.log(err);
        alert('팔로우 취소에 실패했습니다.');
      });
  };

  // const onClickHandler = (e: MouseEvent) => {
  //   navigate(`/feed/${feeds?.feedId}`);
  // };

  useEffect(() => {
    httpInterface
      .getUsersProfile(userInfo.userId, userId)
      .then((res) => {
        console.log(res.data.user);
        console.log(res.data);

        setFeeds(res.data.feeds);
        setTimers(res.data.timers);
        setUser(res.data.user);
        setFollowingState(res.data.followingState);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [follow, userId, showModal, followingState]);

  return (
    <article className={styles['profile-article']}>
      <div className={styles['profile-icon']}>
        {
          <Image
            src={user?.profilePhoto}
            alt={'profile image'}
            className={styles['profile-image']}
          />
        }
      </div>
      <main className={styles['profile-main']}>
        <div className={styles['profile-userinfo']}>
          <span className={styles['username']}>{user?.name}</span>
          <span className={styles['userid']}>{`@${user?.userId}`}</span>
          {checkMyProfile() ? (
            <Button
              text={'프로필 편집'}
              type='button'
              onClick={() => toggleShowModal(true)}
              className={styles['profile-btn']}
            />
          ) : !followingState ? (
            <Button
              text={'팔로우'}
              type='button'
              onClick={onFollow}
              className={styles['profile-btn']}
            />
          ) : (
            <Button
              text={'팔로우 취소'}
              type='button'
              onClick={onUnfollow}
              className={styles['profile-btn']}
            />
          )}
        </div>
        <div className={styles['profile-meta']}>
          <div className={styles['profile-followers']}>
            <span>팔로워</span>
            <span>{user?.followerCount}</span>
          </div>
          <div className={styles['profile-following']}>
            <span>팔로우</span>
            <span>{user?.followingCount}</span>
          </div>
        </div>
        <div className={styles['profile-bio']}>
          <p>{user?.profilePhrase}</p>
          <div>
            <StudyLog timers={timers} />
          </div>
        </div>
        <div className={styles['profile-contents']}>
          {feeds?.reverse().map((feed) => (
            <div
              className={styles['feed-content']}
              key={feed.feedId}
              onClick={(e) => {
                navigate(`/feed/${feed.feedId}`);
              }}>
              <p>{feed.feedBody}</p>
              <div>
                <Image
                  src={feed.photo}
                  alt={'feed image'}
                  className={styles['feed-image']}
                />{' '}
                <p>{feed.feedBody}</p>
                <div className={styles['feed-meta']}>
                  <span>
                    <FaCommentAlt /> {feed.comments?.length}
                  </span>
                  <span>
                    <FaThumbsUp /> {feed.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showModal && (
          <ModalPortal>
            <ModalWrapper
              show={showModal}
              closeModal={() => toggleShowModal(false)}>
              <EditProfile
                closeModal={() => toggleShowModal(false)}
                userId={user?.userId}
                userName={user?.name}
              />
            </ModalWrapper>
          </ModalPortal>
        )}
      </main>
    </article>
  );
}
