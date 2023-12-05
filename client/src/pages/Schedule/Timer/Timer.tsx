import React, { useEffect, useState } from 'react';
import useTimerState from '../../../stores/timer';

export default function Timer() {
  const { startTime, doing, endTime } = useTimerState();
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (!startTime || typeof startTime === 'string') return;
    if (endTime) return;
    let id = window.setInterval(() => {
      const now = new Date();
      const time = parseInt(`${(now.getTime() - startTime?.getTime()) / 1000}`);
      setTime(time);

      if (!doing) window.clearInterval(id);
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, [startTime, doing, endTime]);

  if (!startTime || typeof startTime === 'string') return <></>;
  if (time === undefined) return <></>;
  if (!doing) return <></>;

  
  const hour = parseInt(`${(time) / (60 * 60)}`);
  let temp = time - hour * 60 * 60;
  const minute = parseInt(`${temp / 60}`);
  const second = temp - minute * 60;

  return (
    <div>
      <p>{`공부 시작 시간: ${startTime?.getHours()}시 ${startTime?.getMinutes()}분 ${startTime?.getSeconds()}초`}</p>
      <p>{`${hour}시간 ${minute}분 ${second}초`}</p>
    </div>
  );
}
