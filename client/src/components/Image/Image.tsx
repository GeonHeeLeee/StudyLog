import {ImgHTMLAttributes, useEffect, useRef, useState} from "react";

import Placeholder from '../../img/placeholder.jpeg';
import styles from './Image.module.css';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  // lazy?: boolean;
  className: string;
}

export default function Image({src, alt, className}: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(onIntersection, {
        // 확인을 위해 이미지 절반이 나타날 때 로딩한다.
        threshold: 0.5
      });
    }

    imgRef.current && observerRef.current.observe(imgRef.current);
  }, []);

  function onIntersection(
      entries: IntersectionObserverEntry[],
      io: IntersectionObserver
  ) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        setIsLoad(true);
      }
    });
  }

  return <img
      ref={imgRef}
      alt={alt}
      src={isLoad ? src : Placeholder}
      className={`${styles['image']} ${className}`}
  />

}