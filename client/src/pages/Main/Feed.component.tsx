import React, { useState } from 'react';
import styles from './Feed.module.css';
import Image from '../../components/Image/Image';
// import {useIsElementInViewport} from "../../hooks/intersectionObserver/useIsElementInViewport";
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';
import { FeedOutline } from '../../api/networkInterface/api/http.type';
import { useMutation } from '@tanstack/react-query';
import useNetwork from '../../stores/network';

type Props = {
  feed: FeedOutline;
  page: number;
};

export default function Feed({ feed, page }: Props) {
  const { httpInterface } = useNetwork();
  const { mutate } = useMutation({
    mutationKey: ['like', feed.feedId, feed.likes],
    mutationFn: (feedId: number) => httpInterface.likeFeed(feedId),
    onSuccess: (data, variables) => {
      console.log(data, variables);
    },
  });
  return (
    <article className={styles['feed-article']}>
      <div className={styles['profile-icon']}>
        {/*<a>Profile 아이콘</a>*/}
        <div></div>
      </div>
      <main className={styles['feed-main']}>
        <div className={styles['feed-userinfo']}>
          {/* <span className={styles['username']}>{feed.userName}</span> */}
          <span className={styles['username']}>{feed.writerId}</span>
          <span className={styles['userid']}>{feed.writerId}</span>
          <span className={styles['date']}>{feed.date}</span>
        </div>
        <div className={styles['feed-content']}>
          <p>{feed.feedBody}</p>
          {/* IMG가 존재하면 보여주기 */}
          <div>
            {feed.photo && feed.photo.length > 0 && (
              <Image
                src={feed.photo}
                alt='피드이미지'
                className={styles['feed-image']}
              />
            )}
            {/* {<Image src={feed.photo} alt={''} className={styles['feed-image']} />} */}
          </div>
        </div>
        <div className={styles['feed-meta']}>
          <div className={styles['feed-comments']} onClick={() => {}}>
            <span>
              <FaCommentAlt />
            </span>
            <span>6</span>
          </div>
          <div
            className={styles['feed-likes']}
            onClick={() => {
              mutate(feed.feedId);
            }}
          >
            <span>
              <FaThumbsUp />
            </span>
            <span>{feed.likes}</span>
          </div>
        </div>
      </main>
    </article>
  );
}
