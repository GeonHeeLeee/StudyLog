import React from 'react';
import useTimerState from '../../../stores/timer';
import Button from '../../../components/Button/Button.component';
import { transformDateObject } from '../@components/TodoList/@utils/dateToString';

export default function TimerButton() {
  const { doing, finishStudy, startStudy } = useTimerState();
  return (
    <div>
      {!doing && (
        <Button
          text='LOG STUDY'
          type='button'
          onClick={() => {
            const now = new Date();
            startStudy(transformDateObject(now));
            startStudy(now);
          }}
        />
      )}
      {doing && (
        <Button
          text='FINISH'
          type='button'
          onClick={() => {
            const now = new Date();
            finishStudy(transformDateObject(now));
            // finishStudy(now);
          }}
        />
      )}
    </div>
  );
}
