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
      {feeds?.map((feed, idx) => (
        <Feed key={idx} feed={feed} page={page} />
      ))}
    </>
  );
}
