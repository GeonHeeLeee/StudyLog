import React from 'react';

import Calendar from './@components/Calendar/Calendar.component';
import TodoListContainer from './@components/TodoList/TodoListContainer.component';
// import TimerComponent from './Timer/TimerComponent';
import { useScheduleContext } from './@contexts/useSchedule';
import styles from './Schedule.module.css';
import ModalPortal from '../../components/Portal/ModalPortal.component';
import ModalWrapper from '../../components/Modal/ModalWrapper.component';

export default function Schedule() {
  const { show, reset } = useScheduleContext();
  const hideSchedule = () => reset();
  return (
    <div className={styles['schedule-container']}>
      <Calendar />
      {show && (
        <ModalPortal>
          <ModalWrapper show={show} closeModal={hideSchedule}>
            {/* <CreateFeedModal closeModal={hideSchedule} /> */}
            <div className={styles['todo-timer-container']}>
              <TodoListContainer />
            </div>
          </ModalWrapper>
        </ModalPortal>
      )}
      {/* <div className={styles['todo-timer-container']}>
        <TodoListContainer />
      </div> */}
    </div>
  );
}
