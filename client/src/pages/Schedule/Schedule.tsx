import React from 'react';
import Calendar from './@components/Calendar/Calendar.component';
import { useScheduleContext } from './@contexts/useSchedule';
import TodoList from './@components/TodoList/TodoList.component';

export default function Schedule() {
  const { show } = useScheduleContext();
  return (
    <div>
      <Calendar />
      {show && <TodoList />}
    </div>
  );
}
