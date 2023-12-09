import React from 'react';
import useTimerState from '../../../stores/timer';
import styles from './TimerButton.module.css';
import { ClockLoader } from 'react-spinners';
import useNetwork from '../../../stores/network';
import useLoginState from '../../../stores/login';
import { stringifyDate } from '../../../utils/date/date';

export default function TimerButton() {
  const { doing, finishStudy, startStudy, startTime, restore } =
    useTimerState();
  const { httpInterface } = useNetwork();
  const {
    userInfo: { userId },
  } = useLoginState();
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
          <ClockLoader color='#36d7b7' size={20} /> Log Study
        </button>
      )}
      {doing && (
        <button
          type='button'
          onClick={async () => {
            const now = new Date();
            // finishStudy(transformDateObject(now));
            if (typeof startTime === 'string') {
              restore();
              return;
            }

            if (!startTime) return;

            const studyTime = parseInt(
              `${(now.getTime() - startTime?.getTime()) / 1000}`
            );
            await httpInterface.addStudyTime({
              userId,
              date: stringifyDate(startTime),
              studyTime,
            });

            finishStudy(now);
          }}
          className={styles['timer-button']}
        >
          Finish
        </button>
      )}
    </div>
  );
}
