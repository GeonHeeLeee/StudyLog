import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface FetchUrl {
  <T>(params: { pageParam: number }): Promise<T>;
  (params: { pageParam: number }): Promise<any>;
}

const fetchUrl: FetchUrl = async ({ pageParam = 1 }) => {
  const initialUrl = '';
  const response = await fetch(initialUrl + pageParam);
  return response;
};

// TODO: URL 정하고, response type 정의하기
export default function Main() {
  // const { ref, inView } = useInView();
  // const { data, isLoading, fetchNextPage, hasNextPage, isError, error } =
  //   useInfiniteQuery({
  //     queryKey: ['mainFeeds'],
  //     queryFn: fetchUrl,
  //     initialPageParam: 0,
  //     getNextPageParam: (lastPage: { next?: number }) =>
  //       lastPage.next || undefined,
  //   });

  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage();
  //   }
  // }, [fetchNextPage, inView]);

  return <div></div>;
}
