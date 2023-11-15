import {useInfiniteQuery} from '@tanstack/react-query';
import {useIntersectionObserver} from '../../hooks/intersectionObserver/useIntersectionObserver';
import Feeds from './Feeds.component';
import {useEffect, useRef, useState} from "react";
import FeedSkeleton from "./FeedSkeleton";

// interface FetchUrl {
//   <T>(params: { pageParam: number }): Promise<T>;
//   (params: { pageParam: number }): Promise<any>;
// }

// const fetchUrl: FetchUrl = async ({ pageParam = 1 }) => {
//   const initialUrl = '';
//   const response = await fetch(initialUrl + pageParam);
//   return response;
// };

// TODO: 변경할 부분! response에 따라 변경하기
export type FeedResult = {
  [key: string]: any;
};

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url: string) => {
  console.log(url);

  const response = await fetch(url);
  return response.json();
};

const MIN_FEED_COUNT = 10;
export default function FeedContainer() {
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
    queryFn: ({pageParam = initialUrl}) => fetchUrl(pageParam + ''),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: {
      next?: string;
      count?: number;
      previous: string | null;
      results: FeedResult[];
    }) => {
      return lastPage.next || undefined;
    },
  });

  const {setTarget} = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });
  const elemRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const [isLoad, setIsLoad] = useState(false);

  const onIntersection = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
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


  return (
      <div>
        <main>
          {data?.pages.map((feeds, idx) => (
              <Feeds key={idx} feeds={feeds?.results}/>
          ))}
          {isFetching && createSkeletonFeed(MIN_FEED_COUNT)}
        </main>

        {hasNextPage && <div ref={setTarget} style={{width: '100%', height: '0.25rem'}}/>}

      </div>
  );
}

function createSkeletonFeed(count: number) {
  let skeletonFeedCount = Array.from({ length: count }, (v, i) => i);
  return skeletonFeedCount.map(num => {
    return <FeedSkeleton key={num} />;
  });
}
