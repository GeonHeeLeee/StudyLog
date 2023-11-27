import React from 'react';

import Calendar from './@components/Calendar/Calendar.component';
import TodoListContainer from './@components/TodoList/TodoListContainer.component';
import { useScheduleContext } from './@contexts/useSchedule';

export default function Schedule() {

  return (
    <div>
      <Calendar />
      {<TodoListContainer />}
    </div>
  );
}
