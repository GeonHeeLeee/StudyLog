import React from 'react';

import Calendar from './@components/Calendar/Calendar.component';
import TodoListContainer from './@components/TodoList/TodoListContainer.component';
import { useScheduleContext } from './@contexts/useSchedule';

export default function Schedule() {
  const { show } = useScheduleContext();

  return (
    <div>
      <Calendar />
      {show && <TodoListContainer />}
    </div>
  );
}
