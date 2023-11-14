import React from 'react';
import { FeedResult } from './FeedContainer.component';
import styles from './Feed.module.css';
import Image from "../../components/Image/Image";
import {useIsElementInViewport} from "../../hooks/intersectionObserver/useIsElementInViewport";

type Props = {
  feed: FeedResult;
};

export default function Feed({ feed }: Props) {
  // const {elementRef, isVisible} = useIsElementInViewport<HTMLDivElement>({
  //   rootMargin: '0px 0px 500px 0px', // viewport 하단 500px 영역 내에 들어왔을 때
  // })
  return (
    <article className={styles['feed-article']} >
      <div className={styles['profile-icon']}>
        <a>Profile 아이콘</a>
      </div>
      <main>
        <div>
          <span>이름</span>
          <span>아이디(@)</span>
          <span>날짜</span>
        </div>
        <div>
          <p>문단...</p>
        </div>
        <div>
        {/* IMG가 존재하면 보여주기 */}
          <Image src='/img.jpg' alt={''} />
        </div>
        <div>
          <span>댓글 아이콘</span>
          <span>좋아요 아이콘</span>
        </div>
      </main>
    </article>
  );
}
