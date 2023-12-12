import React, { MouseEvent, useRef, useState } from 'react';
import styles from './Feed.module.css';
import Image from '../../components/Image/Image';
// import {useIsElementInViewport} from "../../hooks/intersectionObserver/useIsElementInViewport";
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';
import { FeedOutline } from '../../api/networkInterface/api/http.type';
import { useMutation } from '@tanstack/react-query';
import useNetwork from '../../stores/network';
import { useNavigate } from 'react-router-dom';
import queryClient from '../../api/queryClient/queryClient';
import { FeedData } from './@types/feed.type';
import useLoginState from '../../stores/login';

type Props = {
  feed: FeedOutline;
  page: number;
};

type MainFeed = {
  pageParams: (string | undefined)[];
  pages: FeedData[];
};

export default function Feed({ feed, page }: Props) {
  const { httpInterface } = useNetwork();
  const navigate = useNavigate();
  const {
    userInfo: { userId },
  } = useLoginState();
  const { mutate } = useMutation({
    mutationKey: ['like', feed.feedId, feed.likes],
    mutationFn: (feedId: number) => httpInterface.likeFeed(feedId),
    onSuccess: (data, variables) => {
      console.log(data, variables);
    },
    onMutate: async () => {
      const previousFeed = queryClient.getQueryData<MainFeed>(['mainFeeds']);

      queryClient.setQueryData(['mainFeeds'], (old: MainFeed) => {
        return {
          pageParams: [...old.pageParams],
          pages: old.pages.map((item, idx) => {
            if (idx === page) {
              return {
                ...item,
                data: {
                  ...item.data,
                  feeds: item.data.feeds.map((f) => {
                    if (f.feedId === feed.feedId) {
                      return {
                        ...f,
                        likes: f.likes + 1,
                      };
                    } else {
                      return f;
                    }
                  }),
                },
              };
            } else {
              return item;
            }
          }),
        };
      });

      return { previousFeed };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(['mainFeeds'], context?.previousFeed);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['mainFeeds'] });
    },
  });

  const onClickHandler = (e: MouseEvent<HTMLElement>) => {
    navigate(`/feed/${feed.feedId}`);
  };
  const formattedDate = formatDateString(feed.date);

  return (
    <article className={styles['feed-article']} onClick={onClickHandler}>
      <div className={styles['profile-icon']}>
        {/*<a>Profile 아이콘</a>*/}
        <div></div>
        {feed?.profilePhoto?.length > 0 && (
          <div
            style={{
              backgroundImage: `url(${feed.profilePhoto})`,
              backgroundSize: 'contain',
            }}
            className={styles['profile-image']}
          />
        )}
      </div>
      <main className={styles['feed-main']}>
        <div className={styles['feed-userinfo']}>
          <span className={styles['username']}>{feed.userName}</span>
          {/* <span className={styles['username']}>{feed.writerId}</span> */}
          <span className={styles['userid']}>{feed.writerId}</span>
          <span
            className={styles['date']}
          >{`${formattedDate[0]} ${formattedDate[1]}`}</span>
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
          <div
            className={styles['feed-comments']}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span>
              <FaCommentAlt />
            </span>
            <span>{feed.comments.length}</span>
          </div>
          <div
            className={styles['feed-likes']}
            onClick={(e) => {
              e.stopPropagation();
              console.log(userId, feed.writerId);

              if (userId === feed.writerId) return;

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

function formatDateString(dateString: string) {
  const date = dateString.split('T');
  return [date[0], date[1].split('.')[0]];
}
