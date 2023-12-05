import React from 'react';
import TimerButton from './TimerButton';
import Timer from './Timer';
import useTimerState from '../../../stores/timer';
import styles from './TimerComponent.module.css';

export default function TimerComponent() {
  const { doing } = useTimerState();
  return (
    <div className={styles['timer-component']}>
      <div className={`${styles['timer-container']} ${!doing && styles['invisible']}`}>{doing && <Timer />}</div>
      <TimerButton />
    </div>
  );
}
