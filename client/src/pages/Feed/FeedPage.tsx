import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useNetwork from '../../stores/network';
import useLoginState from '../../stores/login';
import Image from '../../components/Image/Image';

import styles from './Feed.module.css';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';
import Comment from './Comment';
import {
  Comment as CommentData,
  FeedDetail,
} from '../../api/networkInterface/api/http.type';
import Input from '../../components/Input/Input.component';
import Button from '../../components/Button/Button.component';
import queryClient from '../../api/queryClient/queryClient';
import { FeedResponseData } from './Feed.type';
import Feed from './Feed';

// export type CommentData = {
//   commentBody: string;
//   userId: string;
//   feedId: string;
// };

// TODO: 리팩토링 예정
export default function FeedPage() {
  const { id } = useParams();
  const { httpInterface } = useNetwork();
  const [commentBody, setCommentBody] = useState('');
  const {
    userInfo: { userId },
  } = useLoginState();
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ['feed-detail', id],
    queryFn: () =>
      httpInterface.getFeedById({
        feedId: parseInt(id!),
        userId,
      }),
  });
  console.log(id, userId);

  const { mutate } = useMutation({
    mutationFn: () =>
      httpInterface.postCommentInFeed({
        userId,
        feedId: parseInt(id!),
        commentBody,
      }),
    onSuccess: (data, variables) => {
      // queryClient.invalidateQueries({ queryKey: ['feed-detail', id] });
      setCommentBody('');
    },
    onMutate: async (data: FeedDetail) => {
      await queryClient.cancelQueries({ queryKey: ['feed-detail', id] });
      const previousFeed = await queryClient.getQueryData(['feed-detail', id]);

      await queryClient.setQueryData(
        ['feed-detail', id],
        (old: FeedResponseData) => {
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
        }
      );

      return { previousFeed };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(['feed-detail', id], context?.previousFeed);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed-detail', id] });
    },
  });
  if (isLoading) {
    return <></>;
  }

  if (!id) return <></>;
  if (isFetching) {
    const { data: feed } = data;

    return <Feed feed={feed} id={id} />;
    // return (
    //   <div>
    //     <article className={styles['feed-article']}>
    //       <div className={styles['profile-icon']}>
    //         {/*<a>Profile 아이콘</a>*/}
    //         <div></div>
    //       </div>
    //       <main className={styles['feed-main']}>
    //         <div className={styles['feed-userinfo']}>
    //           {/* <span className={styles['username']}>{feed.userName}</span> */}
    //           <span className={styles['username']}>{feed.writerId}</span>
    //           <span className={styles['userid']}>{feed.writerId}</span>
    //           <span className={styles['date']}>{feed.date}</span>
    //         </div>
    //         <div className={styles['feed-content']}>
    //           <p>{feed.feedBody}</p>
    //           {/* IMG가 존재하면 보여주기 */}
    //           <div>
    //             {feed.photo && feed.photo.length > 0 && (
    //               <Image
    //                 src={feed.photo}
    //                 alt='피드이미지'
    //                 className={styles['feed-image']}
    //               />
    //             )}
    //           </div>
    //         </div>
    //         <div className={styles['feed-meta']}>
    //           <div className={styles['feed-comments']} onClick={() => {}}>
    //             <span>
    //               <FaCommentAlt />
    //             </span>
    //             <span>{feed.comments ? feed.comments?.length : 0}</span>
    //           </div>
    //           <div
    //             className={styles['feed-likes']}
    //             // onClick={() => {
    //             //   mutate(feed.feedId);
    //             // }}
    //           >
    //             <span>
    //               <FaThumbsUp />
    //             </span>
    //             <span>{feed.likes}</span>
    //           </div>
    //         </div>
    //       </main>
    //     </article>
    //     <form
    //       onSubmit={(e) => {
    //         e.preventDefault();
    //         if (commentBody.length === 0) return;
    //         mutate(feed.id);
    //       }}
    //     >
    //       <Input
    //         name='comment'
    //         onChangeHandler={(e) => {
    //           setCommentBody(e.target.value);
    //         }}
    //         value={commentBody}
    //       />
    //       <Button type='submit' text='댓글달기' />
    //     </form>
    //     <p>댓글</p>
    //     <div>
    //       {feed.comments &&
    //         feed.comments?.map((comment: CommentData, idx: number) => (
    //           <Comment key={`${comment.feedId}_${idx}`} comment={comment} />
    //         ))}
    //     </div>
    //   </div>
    // );
  }
  if (isError) return <>에러...</>;
  if (!data) return <>에러...</>;

  const { data: feed } = data;
  console.log(feed);
  return <Feed feed={feed} id={id} />;
  // return (
  //   <div>
  //     <article className={styles['feed-article']}>
  //       <div className={styles['profile-icon']}>
  //         {/*<a>Profile 아이콘</a>*/}
  //         <div></div>
  //       </div>
  //       <main className={styles['feed-main']}>
  //         <div className={styles['feed-userinfo']}>
  //           {/* <span className={styles['username']}>{feed.userName}</span> */}
  //           <span className={styles['username']}>{feed.writerId}</span>
  //           <span className={styles['userid']}>{feed.writerId}</span>
  //           <span className={styles['date']}>{feed.date}</span>
  //         </div>
  //         <div className={styles['feed-content']}>
  //           <p>{feed.feedBody}</p>
  //           {/* IMG가 존재하면 보여주기 */}
  //           <div>
  //             {feed.photo && feed.photo.length > 0 && (
  //               <Image
  //                 src={feed.photo}
  //                 alt='피드이미지'
  //                 className={styles['feed-image']}
  //               />
  //             )}
  //           </div>
  //         </div>
  //         <div className={styles['feed-meta']}>
  //           <div className={styles['feed-comments']} onClick={() => {}}>
  //             <span>
  //               <FaCommentAlt />
  //             </span>
  //             <span>{feed.comments ? feed.comments?.length : 0}</span>
  //           </div>
  //           <div
  //             className={styles['feed-likes']}
  //             // onClick={() => {
  //             //   mutate(feed.feedId);
  //             // }}
  //           >
  //             <span>
  //               <FaThumbsUp />
  //             </span>
  //             <span>{feed.likes}</span>
  //           </div>
  //         </div>
  //       </main>
  //     </article>
  //     <form
  //       onSubmit={(e) => {
  //         e.preventDefault();
  //         if (commentBody.length === 0) return;
  //         mutate(feed.id);
  //       }}
  //     >
  //       <Input
  //         name='comment'
  //         onChangeHandler={(e) => {
  //           setCommentBody(e.target.value);
  //         }}
  //         value={commentBody}
  //       />
  //       <Button type='submit' text='댓글달기' />
  //     </form>
  //     <p>댓글</p>
  //     <div>
  //       {feed.comments &&
  //         feed.comments?.map((comment: CommentData, idx: number) => (
  //           <Comment key={`${comment.feedId}_${idx}`} comment={comment} />
  //         ))}
  //     </div>
  //   </div>
  // );
}
