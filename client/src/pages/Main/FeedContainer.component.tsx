import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import Feeds from './Feeds.component';
import FeedSkeleton from './FeedSkeleton';
import { useIntersectionObserver } from '../../hooks/intersectionObserver/useIntersectionObserver';
import useNetwork from '../../stores/network';
import useLoginState from '../../stores/login';
import { FeedOutline } from '../../api/networkInterface/api/http.type';
import styles from './FeedContainer.module.css';

const MIN_FEED_COUNT = 5;

export default function FeedContainer() {
  const { httpInterface } = useNetwork();
  const {
    userInfo: { userId },
  } = useLoginState();

  const initialFeedUrl = `/home?userId=${userId}&page=1`;

  const fetchUrl = async (url: string) => {
    const res = await httpInterface.get(url);
    return res;
  };

  const {
    data,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['mainFeeds'],
    queryFn: ({ pageParam = initialFeedUrl }) => fetchUrl(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: {
      data: {
        next?: string;
        count?: number;
        previous: string | null;
        feeds: FeedOutline[];
      };
    }) => {
      if (lastPage?.data?.next) {
        const split = lastPage?.data?.next.split('8081/');
        const url = split[1];
        console.log(url);

        return url;
      } else {
        return;
      }
    },
  });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });
  const elemRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const [isLoad, setIsLoad] = useState(false);

  const onIntersection = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        setIsLoad(true);
      }
    });
  };

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(onIntersection);
    }

    elemRef.current && observerRef.current.observe(elemRef.current);
  }, []);

  if (isError) {
    console.error(error);
    // TODO: 변경할 부분(컴포넌트 꾸며서 바꾸기)
    return <h1>Error!</h1>;
  }

  if (isLoading) {
    return <>{createSkeletonFeed(MIN_FEED_COUNT)}</>;
  }

  if (isFetching) {
    return (
      <>
        <main className={styles['feed-container']}>
          {data?.pages.map((feeds, idx) => (
            <Feeds key={idx} feeds={feeds.data.feeds} page={idx} />
          ))}
          {createSkeletonFeed(MIN_FEED_COUNT)}
          {/* {isFetching && createSkeletonFeed(MIN_FEED_COUNT)} */}
        </main>

        {/* {hasNextPage && (
          <div ref={setTarget} style={{ width: '100%', height: '0.25rem' }} />
        )} */}
      </>
    );
  }

  return (
    <>
      <main className={styles['feed-container']}>
        {data?.pages.map((feeds, idx) => (
          <Feeds key={idx} feeds={feeds.data.feeds} page={idx} />
        ))}
        {/* {isFetching && createSkeletonFeed(MIN_FEED_COUNT)} */}
      </main>

      {hasNextPage && (
        <div ref={setTarget} style={{ width: '100%', height: '0.25rem' }} />
      )}
    </>
  );
}

function createSkeletonFeed(count: number) {
  let skeletonFeedCount = Array.from({ length: count }, (v, i) => i);
  return skeletonFeedCount.map((num) => {
    return <FeedSkeleton key={num} />;
  });
}
