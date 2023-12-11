import { HttpInterface } from '../../api/networkInterface/api/httpInterface';
import useNetwork from '../../stores/network';
import { useEffect, useState } from 'react';
import styles from './EditFeed.module.css';

type Props = {
  closeModal: () => void;
  feedId: number;
};

type Follow = {
  userId: string;
  userName: string;
  profilePhoto: string | null;
  profilePhrase: string | null;
};

export default function EditFeedModal({ closeModal, feedId }: Props) {
  const { httpInterface } = useNetwork();
  const [feedBody, setFeedBody] = useState<string>('');

  // useEffect(() => {
  //   httpInterface.followingList(userId).then((res) => {
  //     console.log(res.data);
  //     setFollow(res.data.followings);
  //   });
  // }, [userId]);

  const handleEditFeed = () => {
    httpInterface
      .editFeed(feedId, feedBody)
      .then((res) => {
        res.status === 200 && closeModal();
      })
      .catch((err) => {
        console.log(err);
        alert('피드 수정에 실패했습니다.');
      });
  };

  return (
    <div>
      <h2 style={{ marginLeft: '30px' }}>피드 수정</h2>
      <div className={styles['edit-feed-div']}>
        <textarea
          onChange={(e) => setFeedBody(e.target.value)}
          className={styles.textarea}
          name='editFeed'
          cols={50}
          rows={10}
          placeholder='피드 글 수정'></textarea>
        <button className={styles['btn']} onClick={handleEditFeed}>
          수정
        </button>
      </div>
    </div>
  );
}
