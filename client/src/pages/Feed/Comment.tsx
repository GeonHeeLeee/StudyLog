import React from 'react';
import { Comment as CommentData} from '../../api/networkInterface/api/http.type';
type Props = {
  comment: CommentData;
};
export default function Comment({comment}: Props) {
  return <div>
    <p>{comment.commentBody}</p>
    <span>@{comment.userId}</span>
  </div>;
}
