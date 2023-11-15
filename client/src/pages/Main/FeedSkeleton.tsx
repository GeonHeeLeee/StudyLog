import styles from './Skeleton.module.css';
import Image from "../../components/Image/Image";
import React from "react";
import {MoonLoader} from "react-spinners";


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
              <MoonLoader color="#36d7b7" size={30} />
            </p>
            {/* IMG가 존재하면 보여주기 */}
            <div>
              {/*<Image src='/img.jpg' alt={''} className={`${styles['feed-image']} ${styles.skeleton}`}/>*/}
              <div className={`${styles['feed-image']} ${styles.skeleton}`}></div>
            </div>
          </div>
          <div className={styles['feed-meta']}>
            <div>
              <span>댓글 아이콘</span>
              <span>6</span>
            </div>
            <div>
              <span>좋아요 아이콘</span>
              <span>16</span>
            </div>
          </div>
        </main>
      </article>)
}