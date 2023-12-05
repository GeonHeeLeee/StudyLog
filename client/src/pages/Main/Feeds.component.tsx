import React from 'react';

import Feed from './Feed.component';
import { FeedOutline } from '../../api/networkInterface/api/http.type';

interface Props {
  feeds: FeedOutline[];
}

export default function Feeds({ feeds }: Props) {
  return (
    <>
      {feeds?.map((feed, idx) => (
        <Feed key={idx} feed={feed} />
      ))}
    </>
  );
}
