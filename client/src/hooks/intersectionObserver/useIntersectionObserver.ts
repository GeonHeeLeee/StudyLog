import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import {useCallback, useEffect, useRef, useState} from 'react';

interface IuseIntersectionObserverProps {
  threshold?: number;
  hasNextPage?: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: IuseIntersectionObserverProps) => {
  // 관찰할 요소 (observer)
  const [target, setTarget] = useState<HTMLDivElement | undefined | null>(null);
  const [isLoad, setIsLoad] = useState(false);

  const observerCb: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    },
    [hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(observerCb, {
      threshold,
    });
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [observerCb, threshold, target]);

  return { setTarget };
};
