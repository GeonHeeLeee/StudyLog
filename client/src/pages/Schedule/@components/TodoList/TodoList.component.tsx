import React from 'react';
import { useScheduleContext } from '../../@contexts/useSchedule';
import { MONTHS } from '../../../../@constants/day';

export default function TodoList() {
  const { firstOfMonth, day } = useScheduleContext();
  if (!firstOfMonth) return <></>;
  return (
    <div>
      <h2>{`${firstOfMonth.getFullYear()}. ${
        MONTHS[firstOfMonth.getMonth()]
      }. ${day}`}</h2>
    </div>
  );
}
