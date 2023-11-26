import React, { useState } from 'react';

import ModalPortal from '../../../../components/Portal/ModalPortal.component';
import ModalWrapper from '../../../../components/Modal/ModalWrapper.component';
import TodoModal from '../../../../components/Modal/TodoModal';
import TodoList from './TodoList.component';
import { useScheduleContext } from '../../@contexts/useSchedule';
import { MONTHS } from '../../../../@constants/day';
import { addDate } from '../../../../utils/date/date';
import styles from './TodoListContainer.module.css';

export default function TodoListContainer() {
  const { firstOfMonth, day } = useScheduleContext();

  const todoDate = firstOfMonth ? addDate(firstOfMonth, day) : new Date();
  const [showModal, toggleShowModal] = useState(false);

  const addTodoHandler = () => {
    // 모달 나오도록?
    toggleShowModal(true);
  };

  if (!firstOfMonth) return <></>;
  return (
    <div>
      <header className={styles.header}>
        <h2>
          {`${firstOfMonth.getFullYear()}. ${
            MONTHS[firstOfMonth.getMonth()]
          }. ${day}`}
        </h2>
        <button className={styles['add-button']} onClick={addTodoHandler}>
          일정 추가
        </button>
      </header>
      <TodoList date={todoDate} />
      {showModal && (
        <ModalPortal>
          <ModalWrapper
            show={showModal}
            closeModal={() => toggleShowModal(false)}
          >
            <TodoModal
              closeModal={() => toggleShowModal(false)}
              todoDate={todoDate}
            />
          </ModalWrapper>
        </ModalPortal>
      )}
    </div>
  );
}
