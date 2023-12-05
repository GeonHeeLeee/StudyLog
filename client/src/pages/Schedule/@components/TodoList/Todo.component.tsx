import React, { useState } from 'react';

import Button from '../../../../components/Button/Button.component';
import ModalPortal from '../../../../components/Portal/ModalPortal.component';
import ModalWrapper from '../../../../components/Modal/ModalWrapper.component';
// import TimerModal from '../../../../components/Modal/TimerModal';
import styles from './Todo.module.css';
// import { checkNotFinish, setTodoState } from './@utils/todo';
import TodoDoneModal from '../../../../components/Modal/TodoDoneModal';

type Props = {
  todo: string;
  // startTime?: string;
  // endTime?: string;
  scheduleId: number;
  done: boolean;
  date: string;
};

// export type TodoState = 'start' | 'doing' | 'finish';

export default function Todo({ todo, scheduleId, done, date }: Props) {
  const [showModal, toggleShowModal] = useState(false);

  const showTodoModal = () => toggleShowModal(true);
  const hideTodoModal = () => toggleShowModal(false);

  return (
    <li className={styles['todo-item']}>
      <span className={`${done && styles.finished}`}>{todo}</span>
      <Button
        text={!done ? '일정 종료' : '원상 복구'}
        onClick={showTodoModal}
        className={styles['todo-button']}
      />

      {showModal && (
        <ModalPortal>
          <ModalWrapper show={showModal} closeModal={hideTodoModal}>
            <TodoDoneModal
              closeModal={hideTodoModal}
              scheduleId={scheduleId}
              done={done}
              date={date}
            />
          </ModalWrapper>
        </ModalPortal>
      )}
    </li>
  );
}
