import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '../../hooks/intersectionObserver/useIntersectionObserver';
import Feeds from './Feeds.component';

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

export default function FeedContainer() {
  const { data, isLoading, fetchNextPage, hasNextPage, isError, error } =
    useInfiniteQuery({
      queryKey: ['mainFeeds'],
      queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam + ''),
      initialPageParam: undefined,
      getNextPageParam: (lastPage: {
        next?: string;
        count?: number;
        previous: string | null;
        results: FeedResult[];
      }) => {
        console.log(lastPage.next);
        return lastPage.next || undefined;
      },
    });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  console.log(data?.pages, isLoading);

  if (isError) {
    console.error(error);
    // TODO: 변경할 부분(컴포넌트 꾸며서 바꾸기)
    return <h1>Error!</h1>;
  }

  return (
    <div>
      <ul>
        {data?.pages.map((feeds, idx) => (
          <Feeds key={idx} feeds={feeds?.results} />
        ))}
      </ul>
      <div ref={setTarget} style={{ width: '100%', height: '1rem' }} />
    </div>
  );
}
