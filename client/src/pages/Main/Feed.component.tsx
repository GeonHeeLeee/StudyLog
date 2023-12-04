import React from 'react';
import styles from './Feed.module.css';
import Image from "../../components/Image/Image";
// import {useIsElementInViewport} from "../../hooks/intersectionObserver/useIsElementInViewport";
import {FaCommentAlt, FaThumbsUp} from "react-icons/fa";
import { FeedOutline } from '../../api/networkInterface/api/http.type';

type Props = {
  feed: FeedOutline;
};

export default function Feed({feed}: Props) {
  return (
      <article className={styles['feed-article']}>
        <div className={styles['profile-icon']}>
          {/*<a>Profile 아이콘</a>*/}
          <div></div>
        </div>
        <main className={styles['feed-main']}>
          <div className={styles['feed-userinfo']}>
            <span className={styles['username']}>이석희</span>
            <span className={styles['userid']}>@devLee</span>
            <span className={styles['date']}>{new Date().toLocaleString()}</span>
          </div>
          <div className={styles['feed-content']}>
            <p>문단...</p>
            {/* IMG가 존재하면 보여주기 */}
            <div>
              <Image src='/img.jpg' alt={''} className={styles['feed-image']}/>
            </div>
          </div>
          <div className={styles['feed-meta']}>
            <div className={styles['feed-comments']}>
              <span><FaCommentAlt /></span>
              <span>6</span>
            </div>
            <div className={styles['feed-likes']}>
              <span><FaThumbsUp /></span>
              <span>16</span>
            </div>
          </div>
        </main>
      </article>
  );
}
