import React, { useState } from 'react';
import { FeedData, FeedResponseData } from './Feed.type';
import styles from './Feed.module.css';
import Image from '../../components/Image/Image';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';
import Input from '../../components/Input/Input.component';
import { useMutation } from '@tanstack/react-query';
import useNetwork from '../../stores/network';
import useLoginState from '../../stores/login';
import queryClient from '../../api/queryClient/queryClient';
import {
  FeedDetail,
  Comment as CommentData,
} from '../../api/networkInterface/api/http.type';
import Button from '../../components/Button/Button.component';
import Comment from './Comment';

type Props = {
  feed: FeedData;
  id: string;
};

export default function Feed({ feed, id }: Props) {
  const [commentBody, setCommentBody] = useState('');
  const { httpInterface } = useNetwork();
  const {
    userInfo: { userId },
  } = useLoginState();
  const { mutate } = useMutation({
    mutationFn: (data: CommentData) => httpInterface.postCommentInFeed(data),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['feed-detail', id],
      });
      const previousFeed = await queryClient.getQueryData(['feed-detail', id]);

      queryClient.setQueryData(['feed-detail', id], (old: FeedResponseData) => {
        return {
          ...old,
          data: {
            ...old.data,
            comments: [
              ...old.data.comments,
              { userId, feedId: id, commentBody },
            ],
          },
        };
      });
      setCommentBody('');
      return { previousFeed };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(['feed-detail', id], context?.previousFeed);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed-detail', id] });
    },
  });
  return (
    <div>
      <article className={styles['feed-article']}>
        <div className={styles['profile-icon']}>
          {/*<a>Profile 아이콘</a>*/}
          <div></div>
        </div>
        <main className={styles['feed-main']}>
          <div className={styles['feed-userinfo']}>
            {/* <span className={styles['username']}>{feed.userName}</span> */}
            <span className={styles['username']}>{feed.writerId}</span>
            <span className={styles['userid']}>{feed.writerId}</span>
            <span className={styles['date']}>{feed.date}</span>
          </div>
          <div className={styles['feed-content']}>
            <p>{feed.feedBody}</p>
            {/* IMG가 존재하면 보여주기 */}
            <div>
              {feed.photo && feed.photo.length > 0 && (
                <Image
                  src={feed.photo}
                  alt='피드이미지'
                  className={styles['feed-image']}
                />
              )}
              {/* {<Image src={feed.photo} alt={''} className={styles['feed-image']} />} */}
            </div>
          </div>
          <div className={styles['feed-meta']}>
            <div className={styles['feed-comments']} onClick={() => {}}>
              <span>
                <FaCommentAlt />
              </span>
              <span>{feed.comments.length}</span>
            </div>
            <div
              className={styles['feed-likes']}
              // onClick={() => {
              //   mutate(feed.feedId);
              // }}
            >
              <span>
                <FaThumbsUp />
              </span>
              <span>{feed.likes}</span>
            </div>
          </div>
        </main>
      </article>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (commentBody.length === 0) return;
          mutate({
            userId,
            feedId: parseInt(id),
            commentBody,
          });
        }}
      >
        <Input
          name='comment'
          onChangeHandler={(e) => {
            setCommentBody(e.target.value);
          }}
          value={commentBody}
        />
        <Button type='submit' text='댓글달기' />
      </form>
      <p>댓글</p>
      <div>
        {feed.comments.map((comment: CommentData, idx: number) => (
          <Comment key={`${comment.feedId}_${idx}`} comment={comment} />
        ))}
      </div>
    </div>
  );
}
