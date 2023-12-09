import React from 'react';
import { Comment as CommentData } from '../../api/networkInterface/api/http.type';
import styles from './Comment.module.css';
type Props = {
  comment: CommentData;
};
export default function Comment({ comment }: Props) {
  console.log(comment);

  return (
    <div className={styles['comments-container']}>
      <p className={styles['comment-id']}>@{comment.userId}</p>
      <p className={styles['comment-text']}>{comment.commentBody}</p>
    </div>
  );
}
