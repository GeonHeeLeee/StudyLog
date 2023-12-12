import React, { useCallback, useEffect, useState } from 'react';
import styles from './profile.module.css';
import Image from '../../components/Image/Image';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
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
import EditFeedModal from '../../components/Modal/EditFeedModal';

export default function ProfileContainer() {
  const { userId } = useParams();
  const { userInfo } = useLoginState();
  const { httpInterface } = useNetwork();
  const navigate = useNavigate();

  const [feeds, setFeeds] = useState<Feeds[]>([]);
  const [timers, setTimers] = useState<Timers[]>([]);
  const [user, setUser] = useState<User>();

  const [follow, setFollow] = useState<boolean>(false);
  const [feedId, setFeedId] = useState<number>(0);

  const [followingState, setFollowingState] = useState<boolean>(false);
  const [showEditModal, toggleShowEditModal] = useState<boolean>(false);
  const [showFollowModal, toggleShowFollowModal] = useState<boolean>(false);
  const [showFollowerModal, toggleShowFollowerModal] = useState<boolean>(false);
  const [showEditFeedModal, toggleShowEditFeedModal] = useState<boolean>(false);

  // const userProfile = useCallback(
  //   async (userId: string) => {
  //     return httpInterface.getUsersProfile(userInfo.userId, userId);
  //   },
  //   [userId]
  // );

  useEffect(() => {
    httpInterface
      .getUsersProfile(userInfo.userId, userId)
      .then((res) => {
        const sortedFeeds = res.data?.feeds?.sort(
          (a: Feeds, b: Feeds) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setFeeds(sortedFeeds);
        setTimers(res.data.timers);
        setUser(res.data.user);
        setFollowingState(res.data.followingState);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [follow, userId, showEditModal, followingState, showEditFeedModal]);

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
        res.status === 200 && setFollow(!follow);
      })
      .catch((err) => {
        alert('팔로우에 실패했습니다.');
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
        res.status === 200 && setFollow(!follow);
      })
      .catch((err) => {
        console.log(err);
        alert('팔로우 취소에 실패했습니다.');
      });
  };

  const deleteFeed = (feedId: number) => {
    httpInterface.deleteFeed(feedId).then((res) => {
      res.status === 200 &&
        setFeeds(feeds.filter((feed) => feed.feedId !== feedId));
    });
  };

  console.log(user);
  

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
          {!(feeds.length === 0) ? (
            feeds?.map((feed) => (
              <div
                className={styles['feed-content']}
                key={feed.feedId}
                onClick={(e) => {
                  navigate(`/feed/${feed.feedId}`);
                }}
              >
                <div>
                  {feed.photo?.length > 0 ? (
                    <Image
                      src={feed.photo}
                      alt={'feed image'}
                      className={styles['feed-image']}
                    />
                  ) : (
                    <></>
                  )}
                  <p className={styles['feed-text']}>{feed.feedBody}</p>
                  <div className={styles['feed-meta']}>
                    <span>
                      <FaCommentAlt /> {feed.comments?.length}
                    </span>
                    <span>
                      <FaThumbsUp /> {feed.likes}
                    </span>
                    <span
                      className={styles['edit-feed']}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setFeedId(feed.feedId);
                        toggleShowEditFeedModal(true);
                      }}
                    >
                      {checkMyProfile() && (
                        <IoSettingsSharp className={styles['gear-icon']} />
                      )}
                    </span>
                  </div>
                  {checkMyProfile() && (
                    <button
                      className={styles['delete-button']}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (
                          window.confirm('정말로 이 피드를 삭제하시겠습니까?')
                        ) {
                          deleteFeed(feed.feedId);
                        }
                      }}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles['not-feeds']}>
              <p>아직 작성한 피드가 없습니다.</p>
            </div>
          )}
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
        {showEditFeedModal && (
          <ModalPortal>
            <ModalWrapper
              show={showEditFeedModal}
              closeModal={() => toggleShowEditFeedModal(false)}
            >
              <EditFeedModal
                closeModal={() => toggleShowEditFeedModal(false)}
                feedId={feedId}
              />
            </ModalWrapper>
          </ModalPortal>
        )}
      </main>
    </article>
  );
}
