import React from 'react';
import { FeedResult } from './FeedContainer.component';

type Props = {
  feed: FeedResult;
};

export default function Feed({ feed }: Props) {
  return (
    <article style={{ minHeight: '30vh' }}>
      <div>
        <span>이름</span>
        <span>아이디(@)</span>
        <span>날짜</span>
      </div>
      {/* IMG가 존재하면 보여주기 */}
      <div>
        <p>문단...</p>
      </div>
      <div>{<img src='' alt='' />}</div>
      <div>
        <span>댓글 아이콘</span>
        <span>좋아요 아이콘</span>
      </div>
    </article>
  );
}
