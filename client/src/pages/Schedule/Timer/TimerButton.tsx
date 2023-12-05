import React from 'react';
import useTimerState from '../../../stores/timer';
import styles from './TimerButton.module.css';
import { MdOutlineTimer } from 'react-icons/md';

export default function TimerButton() {
  const { doing, finishStudy, startStudy } = useTimerState();
  return (
    <div>
      {!doing && (
        <button
          type='button'
          onClick={() => {
            const now = new Date();
            // startStudy(transformDateObject(now));
            startStudy(now);
          }}
          className={styles['timer-button']}
        >
          <MdOutlineTimer /> Log Study
        </button>
      )}
      {doing && (
        <button
          type='button'
          onClick={() => {
            const now = new Date();
            // finishStudy(transformDateObject(now));
            finishStudy(now);
          }}
          className={styles['timer-button']}
        >Finish</button>
      )}
    </div>
  );
}
