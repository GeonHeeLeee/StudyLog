import React from "react";
import {FaCommentAlt, FaThumbsUp} from "react-icons/fa";
import {MoonLoader} from "react-spinners";

import styles from './Skeleton.module.css';

export default function FeedSkeleton() {

  return (
      <article className={styles['feed-article-skeleton']}>
        <div className={`${styles['profile-icon']}`}>
          <div className={styles.skeleton}></div>
        </div>
        <main className={styles['feed-main']}>
          <div className={styles['feed-userinfo']}>
            <span className={`${styles['username']} ${styles.skeleton}`}></span>
            <span className={`${styles['userid']} ${styles.skeleton}`}></span>
            <span className={`${styles['date']} ${styles.skeleton}`}></span>
          </div>
          <div className={styles['feed-content']}>
            <p>
              <MoonLoader color="#36d7b7" size={50} />
            </p>
            {/* IMG가 존재하면 보여주기 */}
            <div>
              {/*<Image src='/img.jpg' alt={''} className={`${styles['feed-image']} ${styles.skeleton}`}/>*/}
              <div className={`${styles['feed-image']} ${styles.skeleton}`}></div>
            </div>
          </div>
          <div className={styles['feed-meta']}>
            <div className={styles['feed-comments']}>
              <span><FaCommentAlt /></span>
              <span>6</span>
            </div>
            <div className={styles['feed-likes']}>
              <span><FaThumbsUp /></span>
              <span>16</span>
            </div>
          </div>
        </main>
      </article>)
}