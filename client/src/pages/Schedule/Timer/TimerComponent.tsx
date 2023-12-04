import React from 'react';
import TimerButton from './TimerButton';
import Timer from './Timer';
import useTimerState from '../../../stores/timer';

export default function TimerComponent() {
  const { doing } = useTimerState();
  return (
    <div>
      {doing && <Timer />}
      <TimerButton />
    </div>
  );
}
