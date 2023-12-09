import React from 'react';

import Feed from './Feed.component';
import { FeedOutline } from '../../api/networkInterface/api/http.type';

type TData = {
  next?: string;
  count?: number;
  previous: string | null;
  feeds: FeedOutline[];
};

interface Props {
  feeds: FeedOutline[];
  page: number;
}

export default function Feeds({ feeds, page }: Props) {
  return (
    <>
      {!(feeds.length === 0) ? (
        feeds?.map((feed, idx) => <Feed key={idx} feed={feed} page={page} />)
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
          <p
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#999',
              textAlign: 'center', // 가운데 정렬을 위한 속성 추가
            }}>
            게시물이 없습니다.
            <br />
            다른 사람을 팔로우 해보세요!
          </p>
        </div>
      )}
    </>
  );
}
