import React, { useCallback, useEffect, useState } from 'react';
import styles from './profile.module.css';
import { ProfileResult } from './ProfileResult';
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

type Props = {
  profile: ProfileResult; // 프로필 정보를 담은 객체
};

export default function ProfileContainer() {
  const { userId } = useParams();

  const { userInfo } = useLoginState();

  const { httpInterface } = useNetwork();
  const navigate = useNavigate();

  const [follow, setFollow] = useState<boolean>(false);
  const [feeds, setFeeds] = useState<Feeds[]>([]);
  const [timers, setTimers] = useState<Timers[]>([]);
  const [user, setUser] = useState<User>();
  const [showModal, toggleShowModal] = useState<boolean>(false);

  const userProfile = useCallback(
    async (userId: string) => {
      return httpInterface.getUsersProfile(userId);
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

        // 팔로우 성공 시 팔로우 버튼을 팔로잉 버튼으로 바꿔준다.
        // 팔로우 버튼을 누르면 팔로잉 버튼으로 바뀌고, 팔로잉 버튼을 누르면 팔로우 버튼으로 바뀐다.  });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUnfollow = () => {
    const selfId = userInfo.userId;
    const followingId = userId;

    httpInterface.unFollow({ selfId, followingId }).then((res) => {
      console.log(res);
      res.status === 200 && setFollow(!follow);
    });
  };

  // const onClickHandler = (e: MouseEvent) => {
  //   navigate(`/feed/${feeds?.feedId}`);
  // };

  useEffect(() => {
    httpInterface
      .getUsersProfile(userId)
      .then((res) => {
        setFeeds(res.data.feeds);
        setTimers(res.data.timers);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [follow, userId]);

  return (
    <article className={styles['profile-article']}>
      <div className={styles['profile-icon']}>
        {/*<a>Profile 아이콘</a>*/}
        <div></div>
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
          ) : !follow ? (
            <Button
              text={'팔로우'}
              type='button'
              onClick={onFollow}
              className={styles['profile-btn']}
            />
          ) : (
            <Button
              text={'팔로잉'}
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
            <span>팔로잉</span>
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
          {feeds?.map((feed) => (
            <div
              className={styles['feed-content']}
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
              <EditProfile closeModal={() => toggleShowModal(false)} />
            </ModalWrapper>
          </ModalPortal>
        )}
      </main>
    </article>
  );
}
