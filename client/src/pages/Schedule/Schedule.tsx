import React from 'react';

import Calendar from './@components/Calendar/Calendar.component';
import TodoListContainer from './@components/TodoList/TodoListContainer.component';
import TimerComponent from './Timer/TimerComponent';
import styles from './Schedule.module.css';

export default function Schedule() {
  return (
    <div className={styles['schedule-container']}>
      <Calendar />
      <div className={styles['todo-timer-container']}>
        <TodoListContainer />
        <TimerComponent />
      </div>
    </div>
  );
}
