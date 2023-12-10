import { HttpInterface } from '../../api/networkInterface/api/httpInterface';
import useNetwork from '../../stores/network';
import { useEffect, useState } from 'react';
import styles from './FollowerModal.module.css';

type Props = {
  closeModal: () => void;
  userId: string | undefined;
};

type Follower = {
  userId: string;
  userName: string;
  profilePhoto: string | null;
  profilePhrase: string | null;
};

export default function FollowerModal({ closeModal, userId }: Props) {
  const { httpInterface } = useNetwork();

  const [follwor, setFollower] = useState<Follower[]>([]);

  useEffect(() => {
    httpInterface.followerList(userId).then((res) => {
      setFollower(res.data.followers);
    });
  }, [userId]);
  return (
    <div>
      <h2 style={{ marginLeft: '30px' }}>팔로워</h2>
      <div className={styles['modal']}>
        <ul>
          {follwor.map((follower) => {
            return (
              //navigate 로 바꾸기
              <a href={`${follower.userId}`} className={'box-a'}>
                <div className={styles['box']}>
                  <div
                    style={{
                      backgroundImage: `url(${follower.profilePhoto})`,
                      backgroundSize: 'contain',
                    }}
                    className={styles['users-img']}></div>
                  <div className={styles['users-info']}>
                    <div className={styles['users-id']}>@{follower.userId}</div>
                    <div className={styles['users-name']}>
                      {follower.userName}
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
