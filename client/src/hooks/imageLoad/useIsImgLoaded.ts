import {useEffect, useState} from "react";
import {useIsElementInViewport} from "../intersectionObserver/useIsElementInViewport";

export const useIsImgLoaded = (lazy: boolean) => {
  const {elementRef, isVisible} = useIsElementInViewport<HTMLImageElement>({
    rootMargin: '0px 0px 500px 0px', // viewport 하단 500px 영역 내에 들어왔을 때
  })

  const [isLoaded, setIsLoaded] = useState(!lazy);

  useEffect(() => {
    if (isLoaded || !isVisible) return;


    setIsLoaded(true);
  }, [isVisible]);

  return {elementRef, isLoaded};
}