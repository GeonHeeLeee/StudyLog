import React from 'react';

import { FeedResult } from './FeedContainer.component';
import Feed from './Feed.component';

interface Props {
  feeds: FeedResult[];
}

export default function Feeds({ feeds }: Props) {

  return (
    <>
      {feeds.map((feed, idx) => (
        <Feed key={idx} feed={feed} />
      ))}
    </>
  );
}
