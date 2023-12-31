import useNetwork from '../../stores/network';
import { useEffect, useState } from 'react';
import styles from './FollowerModal.module.css';

type Props = {
  closeModal: () => void;
  userId: string | undefined;
};

type Follow = {
  userId: string;
  userName: string;
  profilePhoto: string | null;
  profilePhrase: string | null;
};

export default function FollowModal({ closeModal, userId }: Props) {
  const { httpInterface } = useNetwork();

  const [follow, setFollow] = useState<Follow[]>([]);

  useEffect(() => {
    httpInterface.followingList(userId).then((res) => {
      setFollow(res.data.followings);
    });
  }, [userId]);
  return (
    <div>
      <h2 style={{ marginLeft: '30px' }}>팔로우</h2>
      <div className={styles['modal']}>
        <ul className={styles['modal-ul']}>
          {follow.map((following) => {
            return (
              //navigate 로 바꾸기
              <a href={`${following.userId}`} className={'box-a'}>
                <div className={styles['box']}>
                  <div
                    style={{
                      backgroundImage: `url(${following.profilePhoto})`,
                      backgroundSize: 'contain',
                    }}
                    className={styles['users-img']}
                  ></div>
                  <div className={styles['users-info']}>
                    <div className={styles['users-id']}>
                      @{following.userId}
                    </div>
                    <div className={styles['users-name']}>
                      {following.userName}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
