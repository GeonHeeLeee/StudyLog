import React from 'react';
import { FeedResult } from './FeedContainer.component';

type Props = {
  feed: FeedResult;
};

export default function Feed({ feed }: Props) {
  return (
    <article style={{minHeight: '30vh'}}>
      <div></div>
      {/* IMG가 존재하면 보여주기 */}
      {<img src='' alt='' />}
      <div>
        <span>♡</span>
        <span>💬</span>
        <span></span>
      </div>
      <div></div>
    </article>
  );
}
