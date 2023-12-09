import React, { useCallback, useEffect, useState } from 'react';
import styles from './profile.module.css';
import Image from '../../components/Image/Image';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import useLoginState from '../../stores/login';
import Button from '../../components/Button/Button.component';
import StudyLog from './StudyLog/StudyLog';

import { Feeds, Timers, User } from './profile.type';

import useNetwork from '../../stores/network';
import ModalPortal from '../../components/Portal/ModalPortal.component';
import ModalWrapper from '../../components/Modal/ModalWrapper.component';
import EditProfile from '../../components/Modal/EditProfileModal';
import FollowerModal from '../../components/Modal/FollowerModal';
import FollowModal from '../../components/Modal/FollowModal';

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
  const [showEditModal, toggleShowEditModal] = useState<boolean>(false);
  const [showFollowModal, toggleShowFollowModal] = useState<boolean>(false);
  const [showFollowerModal, toggleShowFollowerModal] = useState<boolean>(false);

  const userProfile = useCallback(
    async (userId: string) => {
      return httpInterface.getUsersProfile(userInfo.userId, userId);
    },
    [userId]
  );

  useEffect(() => {
    httpInterface
      .getUsersProfile(userInfo.userId, userId)
      .then((res) => {
        setFeeds(res.data.feeds);
        setTimers(res.data.timers);
        setUser(res.data.user);
        setFollowingState(res.data.followingState);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [follow, userId, showEditModal, followingState]);

  if (!user) return <></>;

  const checkMyProfile = () => {
    return userId === userInfo?.userId;
  };

  const onFollow = () => {
    const selfId = userInfo.userId;
    if (!userId) return;
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
    if (!userId) return;

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

  console.log(user.profilePhoto);

  return (
    <article className={styles['profile-article']}>
      <div className={styles['profile-icon']}>
        {user?.profilePhoto && (
          <div
            style={{
              backgroundImage: `url(${user.profilePhoto})`,
              backgroundSize: 'contain',
            }}
            className={styles['profile-image']}
          />
        )}
      </div>
      <main className={styles['profile-main']}>
        <div className={styles['profile-userinfo']}>
          <span className={styles['username']}>{user?.name}</span>
          <span className={styles['userid']}>{`@${user?.userId}`}</span>
          {checkMyProfile() ? (
            <Button
              text={'프로필 편집'}
              type='button'
              onClick={() => toggleShowEditModal(true)}
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
            <span onClick={() => toggleShowFollowerModal(true)}>팔로워</span>
            <span>{user?.followerCount}</span>
          </div>
          <div className={styles['profile-following']}>
            <span onClick={() => toggleShowFollowModal(true)}>팔로우</span>
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
              }}
            >
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
        {showEditModal && (
          <ModalPortal>
            <ModalWrapper
              show={showEditModal}
              closeModal={() => toggleShowEditModal(false)}
            >
              <EditProfile
                closeModal={() => toggleShowEditModal(false)}
                userId={user?.userId}
                userName={user?.name}
              />
            </ModalWrapper>
          </ModalPortal>
        )}

        {showFollowerModal && (
          <ModalPortal>
            <ModalWrapper
              show={showFollowerModal}
              closeModal={() => toggleShowFollowerModal(false)}
            >
              <FollowerModal
                closeModal={() => toggleShowFollowerModal(false)}
                userId={userId}
              />
            </ModalWrapper>
          </ModalPortal>
        )}
        {showFollowModal && (
          <ModalPortal>
            <ModalWrapper
              show={showFollowModal}
              closeModal={() => toggleShowFollowModal(false)}
            >
              <FollowModal
                closeModal={() => toggleShowFollowModal(false)}
                userId={userId}
              />
            </ModalWrapper>
          </ModalPortal>
        )}
      </main>
    </article>
  );
}
