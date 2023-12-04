import React from 'react';

import Calendar from './@components/Calendar/Calendar.component';
import TodoListContainer from './@components/TodoList/TodoListContainer.component';
import TimerComponent from './Timer/TimerComponent';

export default function Schedule() {
  return (
    <div>
      <Calendar />
      <TodoListContainer />
      <TimerComponent />
    </div>
  );
}
